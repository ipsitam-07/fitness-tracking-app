export type GoalType = 'workout_count' | 'weight' | 'calories' | 'duration';

export interface CreateGoalRequest {
  type: GoalType;
  targetValue: number;
  startDate: string;
}

export interface Goal {
  id: string;
  type: GoalType;
  targetValue: number;
  startDate: string;
  status: 'active' | 'completed';
}
