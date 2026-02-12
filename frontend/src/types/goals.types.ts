import type { PaginationParams } from './pagination.types';
export type GoalType = 'workout_count' | 'weight' | 'calories' | 'duration';
import * as z from 'zod';
import { goalFormSchema } from '@/schemas/goal-form';

export interface CreateGoalRequest {
  type: GoalType;
  targetValue: number;
  startDate: string;
}

export interface Goal {
  id: string;
  userId: string;
  goalType: 'workout_count' | 'weight' | 'calories' | 'duration';
  targetValue: number;
  currentValue: number;
  startDate: string;
  endDate: string;
  status?: 'active' | 'completed' | 'abandoned';
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalProgress {
  goal: Goal;
  progress: number;
  remaining: number;
  daysLeft: number;
  isCompleted: boolean;
  isOnTrack: boolean;
  dailyTarget: number;
  projectedCompletion: string | null;
}

export interface GoalPaginationParams extends PaginationParams {
  status?: 'active' | 'completed' | 'abandoned';
}

export type GoalFormValues = z.infer<typeof goalFormSchema>;

export interface ActiveGoalsProps {
  goals: Goal[];
  onAddGoal?: () => void;
  onViewAll?: () => void;
}

export interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  showProgress?: boolean;
}
