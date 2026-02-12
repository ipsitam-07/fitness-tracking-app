import { IWorkoutStatsDTO, IDashboardStatsDTO, IGoalProgressDTO } from '../dtos/stats.dto';
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
import { getGoalsbyGoalID } from '../repositories/goals.repository';
import { ExerciseType } from '../database/models/Workout';
import { IWeeklyTrendDTO } from '../dtos/stats.dto';
import { GoalType } from '../enums/goals';
import { calculateStreak, getWeekDates, getWeekNumber } from '../utils/calculations';

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

  const { currentStreak, longestStreak } = calculateStreak(sortedWorkouts ?? []);

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

//Get daily workout counts for the current week
export async function getDailyWorkoutsService(userId: string) {
  if (!userId) {
    throw new AppError('User ID is required', 400);
  }

  const now = new Date();

  const currentDay = now.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const workouts = await getWorkoutStats(userId, monday, sunday);

  const dailyCounts = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  workouts.forEach((workout) => {
    const workoutDate = new Date(workout.date);

    const dayName = dayNames[workoutDate.getDay()];

    if (dayName && dayName in dailyCounts) {
      dailyCounts[dayName as keyof typeof dailyCounts]++;
    }
  });

  return {
    dailyCounts,
    weekStart: monday.toISOString().split('T')[0],
    weekEnd: sunday.toISOString().split('T')[0],
  };
}

//Get goal progress
export async function getGoalProgressService(userId: string, goalId: string) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!goalId) {
    throw new AppError('Goal ID is required', 400);
  }

  const goal = await getGoalsbyGoalID(goalId);

  if (!goal) {
    throw new AppError('Goal not found', 404);
  }

  if (goal.userId !== userId) {
    throw new AppError('Forbidden: You do not have access to this goal', 403);
  }

  //Determine goal direction based on type and values

  const isWeightGoal = goal.goalType === GoalType.WEIGHT;

  let progress: number;
  let remaining: number;
  let isCompleted: boolean;

  if (isWeightGoal) {
    const startValue = goal.startingValue ?? goal.currentValue;
    const isWeightLoss = goal.targetValue < startValue;
    const isWeightGain = goal.targetValue > startValue;

    if (isWeightLoss) {
      //Calculate weightloss progress

      const totalToLose = startValue - goal.targetValue;
      const alreadyLost = startValue - goal.currentValue;

      progress = totalToLose > 0 ? Math.min((alreadyLost / totalToLose) * 100, 100) : 100;

      remaining = Math.max(goal.currentValue - goal.targetValue, 0);

      isCompleted = goal.currentValue <= goal.targetValue;
    } else if (isWeightGain) {
      // Weight gain progress
      const totalToGain = goal.targetValue - startValue;
      const alreadyGained = goal.currentValue - startValue;

      progress = totalToGain > 0 ? Math.min((alreadyGained / totalToGain) * 100, 100) : 100;
      remaining = Math.max(goal.targetValue - goal.currentValue, 0);
      isCompleted = goal.currentValue >= goal.targetValue;
    } else {
      // Current equals target
      progress = 100;
      remaining = 0;
      isCompleted = true;
    }
  } else {
    //For non weight workout type
    progress =
      goal.targetValue > 0 ? Math.min((goal.currentValue / goal.targetValue) * 100, 100) : 0;
    remaining = Math.max(goal.targetValue - goal.currentValue, 0);

    isCompleted = goal.currentValue >= goal.targetValue;
  }

  //Calculate days left
  const now = new Date();
  const startDate = new Date(goal.startDate);
  const endDate = new Date(goal.endDate);

  const daysLeft = Math.max(
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    0,
  );

  const totalDays = Math.max(
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
    1,
  );

  const daysPassed = Math.max(
    Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
    0,
  );

  let dailyTarget: number;
  let expectedProgress: number;
  let isOnTrack: boolean;

  if (isWeightGoal) {
    const startValue = goal.startingValue ?? goal.currentValue;
    const totalChange = Math.abs(goal.targetValue - startValue);
    dailyTarget = totalChange / totalDays;

    const isWeightLoss = goal.targetValue < startValue;

    if (isWeightLoss) {
      // For weight loss
      const expectedLoss = dailyTarget * daysPassed;
      const actualLoss = startValue - goal.currentValue;
      expectedProgress = expectedLoss;
      isOnTrack = actualLoss >= expectedLoss;
    } else {
      // For weight gain
      const expectedGain = dailyTarget * daysPassed;
      const actualGain = goal.currentValue - startValue;
      expectedProgress = expectedGain;
      isOnTrack = actualGain >= expectedGain;
    }
  } else {
    // For non weight workouts
    dailyTarget = goal.targetValue / totalDays;
    expectedProgress = dailyTarget * daysPassed;
    isOnTrack = goal.currentValue >= expectedProgress;
  }

  let projectedCompletion: Date | null = null;

  if (!isCompleted && daysPassed > 0) {
    if (isWeightGoal) {
      const startValue = goal.startingValue ?? goal.currentValue;
      const isWeightLoss = goal.targetValue < startValue;

      if (isWeightLoss) {
        const weightLost = startValue - goal.currentValue;
        if (weightLost > 0) {
          const lossRate = weightLost / daysPassed;
          const remainingToLose = goal.currentValue - goal.targetValue;
          const daysToComplete = Math.ceil(remainingToLose / lossRate);
          projectedCompletion = new Date(now.getTime() + daysToComplete * 24 * 60 * 60 * 1000);
        }
      } else {
        const weightGained = goal.currentValue - startValue;
        if (weightGained > 0) {
          const gainRate = weightGained / daysPassed;
          const remainingToGain = goal.targetValue - goal.currentValue;
          const daysToComplete = Math.ceil(remainingToGain / gainRate);
          projectedCompletion = new Date(now.getTime() + daysToComplete * 24 * 60 * 60 * 1000);
        }
      }
    } else {
      //For non weight goals
      if (goal.currentValue > 0) {
        const dailyRate = goal.currentValue / daysPassed;
        if (dailyRate > 0) {
          const daysToComplete = Math.ceil((goal.targetValue - goal.currentValue) / dailyRate);
          projectedCompletion = new Date(now.getTime() + daysToComplete * 24 * 60 * 60 * 1000);
        }
      }
    }
  }
  const result: IGoalProgressDTO = {
    goal: {
      id: goal.id,
      goalType: goal.goalType,
      targetValue: goal.targetValue,
      currentValue: goal.currentValue,
      startDate: goal.startDate,
      endDate: goal.endDate,
      status: goal.status,
      description: goal.description!,
    },
    progress: Math.round(progress * 100) / 100,
    remaining: Math.round(remaining * 100) / 100,
    daysLeft,
    isCompleted,
    isOnTrack,
    dailyTarget: Math.round(dailyTarget * 100) / 100,
    projectedCompletion,
  };

  return result;
}
