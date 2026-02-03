import { GoalType } from '../database/models/Goals';
export interface ICreateGoalsDTO {
  type: GoalType;
  targetValue: number;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'completed';
}
