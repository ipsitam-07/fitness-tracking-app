import api from './axio';
import type { CreateGoalRequest, Goal } from '@/types/goals.types';

export async function createGoal(payload: CreateGoalRequest): Promise<Goal> {
  const res = await api.post('/goals', payload);
  return res.data.data;
}
