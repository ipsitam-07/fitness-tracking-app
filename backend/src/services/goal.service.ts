import {
  createGoal,
  getGoalbyUserID,
  getGoalsbyGoalID,
  updateGoal,
  deleteGoal,
} from '../repositories/goals.repository';
import { ICreateGoalsDTO, IUpdateGoalsDTO } from '../dtos/goals.dto';
import { AppError } from '../utils/error';

//Create gaols for an user
export async function createGoalsService(userId: string, payload: ICreateGoalsDTO) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!payload.goalType || !payload.startDate) {
    throw new AppError('Goal type and start date are required', 400);
  }
  if (payload.targetValue <= 0) {
    throw new AppError('Target value must be greater than zero', 400);
  }
  if (!payload.endDate) {
    throw new AppError('End date is required', 400);
  }
  if (new Date(payload.endDate) <= new Date(payload.startDate)) {
    throw new AppError('End date must be after start date', 400);
  }
  return createGoal({ ...payload, userId });
}

//Fetch all goals for an user
export async function getGoalsService(userId: string) {
  if (!userId) {
    throw new AppError('User ID is required', 400);
  }
  return getGoalbyUserID(userId);
}

//Fetch a specific goal by id
export async function findGoalsbyIDService(userId: string, goalId: string) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!goalId) {
    throw new AppError('Goal ID is required', 400);
  }
  const goal = await getGoalsbyGoalID(goalId);
  if (!goal) {
    throw new AppError('Goal not found', 404);
  }

  if (goal.userId !== userId) {
    throw new AppError('Forbidden: You do not have access to this goal', 403);
  }
  return goal;
}

//Update a specific goal of an user by an id
export async function updateUserGoalService(
  userId: string,
  goalId: string,
  payload: IUpdateGoalsDTO,
) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!goalId) {
    throw new AppError('Goal ID is required', 400);
  }
  if (Object.keys(payload).length === 0) {
    throw new AppError('No fields provided to update', 400);
  }

  if (payload.targetValue !== undefined && payload.targetValue <= 0) {
    throw new AppError('Target value must be greater than zero', 400);
  }
  if (payload.currentValue !== undefined && payload.currentValue < 0) {
    throw new AppError('Current value cannot be negative', 400);
  }
  const goal = await findGoalsbyIDService(userId, goalId);
  return updateGoal(goal, payload);
}

//Delete a specific goal of an user by its id
export async function deleteUserGoalService(userId: string, goalId: string) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!goalId) {
    throw new AppError('Goal ID is required', 400);
  }
  const goal = await findGoalsbyIDService(userId, goalId);
  await deleteGoal(goal);
}
