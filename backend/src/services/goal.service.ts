import { createGoal, getGoalbyUserID } from '../repositories/goals.repository';
import { ICreateGoalsDTO } from '../dtos/goals.dto';
import { AppError } from '../utils/error';

//Create gaols for an user
export async function createGoalsService(userId: string, payload: ICreateGoalsDTO) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!payload.type || !payload.startDate) {
    throw new AppError('Invalid or missing data', 400);
  }

  return createGoal({ ...payload, userId });
}

//Fetch all goals for an user
export async function getGoalsService(userId: string) {
  if (!userId) {
    throw new AppError('User not found', 404);
  }
  return getGoalbyUserID(userId);
}
