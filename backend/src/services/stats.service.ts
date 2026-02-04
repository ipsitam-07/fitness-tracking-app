import { IWorkoutStatsDTO } from '../dtos/stats.dto';
import { AppError } from '../utils/error';
import {
  getActiveGoals,
  getAllWorkoutsSorted,
  getCompletedGoalsCount,
  getRecentWorkouts,
  getThisMonthWorkouts,
  getThisWeekWorkouts,
  getWorkoutStats,
} from '../repositories/stats.repository';
import { ExerciseType } from '../database/models/Workout';

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

  const allWorkouts = getWorkoutStats(userId);
  const recentWorkouts = getRecentWorkouts(userId, 5);
  const activeGoals = getActiveGoals(userId);
  const completedGoals = getCompletedGoalsCount(userId);
  const weekWorkouts = getThisWeekWorkouts(userId);
  const monthWorkouts = getThisMonthWorkouts(userId);
  const sortedWorkouts = getAllWorkoutsSorted(userId);

  //Calculating totals
  const totalWorkouts = (await allWorkouts).length;
  const totalDuration = (await allWorkouts).reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = (await allWorkouts).reduce((sum, w) => sum + w.caloriesBurned, 0);

  //Calculating weekly stats
  const thisWeek = {
    workouts: (await weekWorkouts).length,
    duration: (await weekWorkouts).reduce((sum, w) => sum + w.duration, 0),
    calories: (await weekWorkouts).reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  //Calculating monthly stats
  const thisMonth = {
    workouts: (await monthWorkouts).length,
    duration: (await monthWorkouts).reduce((sum, w) => sum + w.duration, 0),
    calories: (await monthWorkouts).reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  const { currentStreak, longestStreak } = calculateStreak(await sortedWorkouts);

  const typeCount: Record<string, number> = {};
  (await allWorkouts).forEach((workout) => {
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

  return {
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
    recentWorkouts: (await recentWorkouts).map((w) => ({
      id: w.id,
      exerciseName: w.exerciseName,
      exerciseType: w.exerciseType,
      duration: w.duration,
      caloriesBurned: w.caloriesBurned,
      date: w.date,
    })),
  };
}
