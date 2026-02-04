import { IWorkoutStatsDTO, IDashboardStatsDTO } from '../dtos/stats.dto';
import { AppError } from '../utils/error';
import {
  getActiveGoals,
  getAllWorkoutsSorted,
  getCompletedGoalsCount,
  getRecentWorkouts,
  getThisMonthWorkouts,
  getThisWeekWorkouts,
  getWorkoutStats,
  getWorkoutsByWeeks,
} from '../repositories/stats.repository';
import { ExerciseType } from '../database/models/Workout';
import { IWeeklyTrendDTO } from '../dtos/stats.dto';
//Get workout statictics for an user
export async function getWorkoutStatsService(userId: string, startDate?: Date, endDate?: Date) {
  if (!userId) {
    throw new AppError('User ID is required', 400);
  }

  const workouts = await getWorkoutStats(userId, startDate, endDate);

  const stats: IWorkoutStatsDTO = {
    totalWorkouts: workouts.length,
    totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
    totalCalories: workouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
    averageDuration: 0,
    averageCalories: 0,
    workoutsByType: {} as Record<ExerciseType, number>,
  };

  //avg calculation to get avg workout duration and calories burned
  if (workouts.length > 0) {
    stats.averageDuration = Math.round(stats.totalDuration / workouts.length);
    stats.averageCalories = Math.round(stats.totalCalories / workouts.length);
  }

  Object.values(ExerciseType).forEach((type) => {
    stats.workoutsByType[type] = 0;
  });

  workouts.forEach((workout) => {
    stats.workoutsByType[workout.exerciseType]++;
  });

  return stats;
}

//Calculate the workout streak of an user
function calculateStreak(workouts: Array<{ date: Date }>): {
  currentStreak: number;
  longestStreak: number;
} {
  if (workouts.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dates = workouts.map((w) => new Date(w.date).toDateString());
  const uniqueDates = [...new Set(dates)].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  // current streak
  if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
    currentStreak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]!);
      const currDate = new Date(uniqueDates[i]!);
      const diffDays = Math.floor(
        (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // longest streak
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]!);
    const currDate = new Date(uniqueDates[i]!);
    const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { currentStreak, longestStreak };
}

//Get workout dashboard stats

export async function getDashboardStatsService(userId: string) {
  if (!userId) {
    throw new AppError('User ID is required', 400);
  }
  const [
    allWorkouts,
    recentWorkouts,
    activeGoals,
    completedGoals,
    weekWorkouts,
    monthWorkouts,
    sortedWorkouts,
  ] = await Promise.all([
    getWorkoutStats(userId),
    getRecentWorkouts(userId, 5),
    getActiveGoals(userId),
    getCompletedGoalsCount(userId),
    getThisWeekWorkouts(userId),
    getThisMonthWorkouts(userId),
    getAllWorkoutsSorted(userId),
  ]);

  //Calculating totals
  const totalWorkouts = allWorkouts.length;
  const totalDuration = allWorkouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = allWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0);

  //Calculating weekly stats
  const thisWeek = {
    workouts: weekWorkouts.length,
    duration: weekWorkouts.reduce((sum, w) => sum + w.duration, 0),
    calories: weekWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  //Calculating monthly stats
  const thisMonth = {
    workouts: monthWorkouts.length,
    duration: monthWorkouts.reduce((sum, w) => sum + w.duration, 0),
    calories: monthWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  const { currentStreak, longestStreak } = calculateStreak(await sortedWorkouts);

  const typeCount: Record<string, number> = {};
  allWorkouts.forEach((workout) => {
    typeCount[workout.exerciseType] = (typeCount[workout.exerciseType] || 0) + 1;
  });

  let favoriteExerciseType: ExerciseType | null = null;
  let maxCount = 0;
  Object.entries(typeCount).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      favoriteExerciseType = type as ExerciseType;
    }
  });

  const result: IDashboardStatsDTO = {
    totalWorkouts,
    totalCalories,
    totalDuration,
    activeGoals,
    completedGoals,
    currentStreak,
    longestStreak,
    thisWeek: thisWeek,
    thisMonth: thisMonth,
    favoriteExerciseType,
    recentWorkouts: recentWorkouts.map((w) => ({
      id: w.id,
      exerciseName: w.exerciseName,
      exerciseType: w.exerciseType,
      duration: w.duration,
      caloriesBurned: w.caloriesBurned,
      date: w.date,
    })),
  };
  return {
    result,
  };
}

//Get weekly trends of workouts
export async function getWeeklyTrendsService(userId: string, weeks: number = 4) {
  if (!userId) {
    throw new AppError('UserID is required', 400);
  }

  if (weeks <= 0 || weeks > 52) {
    throw new AppError('Weeks must be between 1 and 52', 400);
  }

  const workouts = await getWorkoutsByWeeks(userId, weeks);

  // Group workouts by week
  const weeklyData: Record<string, IWeeklyTrendDTO> = {};

  workouts.forEach((workout) => {
    const date = new Date(workout.date);
    const year = date.getFullYear();
    const weekNumber = getWeekNumber(date);
    const weekKey = `${year}-W${weekNumber.toString().padStart(2, '0')}`;

    if (!weeklyData[weekKey]) {
      const { startDate, endDate } = getWeekDates(year, weekNumber);
      weeklyData[weekKey] = {
        week: weekKey,
        startDate: startDate.toISOString().split('T')[0]!,
        endDate: endDate.toISOString().split('T')[0]!,
        workouts: 0,
        duration: 0,
        calories: 0,
      };
    }

    weeklyData[weekKey].workouts++;
    weeklyData[weekKey].duration += workout.duration;
    weeklyData[weekKey].calories += workout.caloriesBurned;
  });

  return Object.values(weeklyData).sort((a, b) => b.week.localeCompare(a.week));
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getWeekDates(year: number, week: number): { startDate: Date; endDate: Date } {
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7;
  const weekStart = new Date(jan4);
  weekStart.setDate(jan4.getDate() - dayOfWeek + 1 + (week - 1) * 7);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return { startDate: weekStart, endDate: weekEnd };
}
