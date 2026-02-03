import { createGoal } from '../repositories/goals.repository';
import { ICreateGoalsDTO } from '../dtos/goals.dto';
import { AppError } from '../utils/error';

export async function createGoalsService(userId: string, payload: ICreateGoalsDTO) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!payload.type || !payload.startDate) {
    throw new AppError('Invalid or missing data', 400);
  }

  return createGoal({ ...payload, userId });
}
