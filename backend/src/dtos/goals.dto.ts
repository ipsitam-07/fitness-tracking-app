import { GoalType, GoalStatus } from '../enums/goals';
export interface ICreateGoalsDTO {
  goalType: GoalType;
  targetValue: number;
  currentValue: number;
  startingValue: number;
  startDate: Date;
  endDate: Date;
  description?: string;
}
export interface IUpdateGoalsDTO {
  targetValue?: number;
  currentValue?: number;
  startingValue?: number;
  endDate?: Date;
  status?: GoalStatus;
  description?: string;
}
