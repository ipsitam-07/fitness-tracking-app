import { GoalType, GoalStatus } from '../database/models/Goals';
export interface ICreateGoalsDTO {
  goalType: GoalType;
  targetValue: number;
  currentValue: number;
  startDate: Date;
  endDate: Date;
  description?: string;
}
export interface IUpdateGoalsDTO {
  targetValue?: number;
  currentValue?: number;
  endDate?: Date;
  status?: GoalStatus;
  description?: string;
}
