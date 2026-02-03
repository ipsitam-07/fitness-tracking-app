import {
  createGoal,
  getGoalbyUserID,
  getGoalsbyGoalID,
  updateGoal,
} from '../repositories/goals.repository';
import { ICreateGoalsDTO, IUpdateGoalsDTO } from '../dtos/goals.dto';
import { AppError } from '../utils/error';

//Create gaols for an user
export async function createGoalsService(userId: string, payload: ICreateGoalsDTO) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!payload.type || !payload.startDate) {
    throw new AppError('Invalid or missing data', 400);
  }

  if (payload.targetValue <= 0) {
    throw new AppError('Target value must be greater than zero', 400);
  }

  if (new Date(payload.endDate!) < new Date(payload.startDate)) {
    throw new AppError('End date must be after start date', 400);
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

//Fetch a specific goal by id
export async function findGoalsbyIDService(userId: string, goalId: string) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!goalId) {
    throw new AppError('Invalid', 400);
  }

  const goals = await getGoalsbyGoalID(goalId);

  return goals;
}

export async function updateUserGoalService(
  userId: string,
  goalId: string,
  payload: IUpdateGoalsDTO,
) {
  if (Object.keys(payload).length === 0) {
    throw new AppError('No fields provided to update', 400);
  }

  const goal = await findGoalsbyIDService(userId, goalId);
  return updateGoal(goal!, payload);
}
