export interface DashboardStats {
  totalWorkouts: number;
  totalCalories: number;
  totalDuration: number;
  activeGoals: number;
  completedGoals: number;
  currentStreak: number;
  longestStreak: number;
  thisWeek: {
    workouts: number;
    calories: number;
    duration: number;
  };
  thisMonth: {
    workouts: number;
    calories: number;
    duration: number;
  };
  favoriteExerciseType: string | null;
  recentWorkouts: Array<{
    id: string;
    exerciseName: string;
    exerciseType: string;
    duration: number;
    caloriesBurned: number;
    date: string;
  }>;
}

export interface DashboardStatsResponse {
  result: DashboardStats;
}

export interface WeeklyTrend {
  week: string;
  startDate: string;
  endDate: string;
  workouts: number;
  duration: number;
  calories: number;
}
