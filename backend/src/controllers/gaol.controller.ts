import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import {
  createGoalsService,
  getGoalsService,
  findGoalsbyIDService,
  updateUserGoalService,
  deleteUserGoalService,
} from '../services/goal.service';
import { ICreateGoalsDTO, IUpdateGoalsDTO } from '../dtos/goals.dto';
import { AppError } from '../utils/error';

//Controller for goal creation
export const createGoals = async (req: IAuthRequest, res: Response) => {
  const gaols = await createGoalsService(req.user!.id, req.body as ICreateGoalsDTO);

  res.status(201).json({
    success: true,
    data: gaols,
  });
};

//Controller for fetching all goals of an user
export const getUserGoals = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const goals = await getGoalsService(userId);

  res.status(200).json({
    success: true,
    data: goals,
  });
};

//Controller for fetching a specific goal by goal ID
export const getGoalsbyID = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const goalId = req.params.id;
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!goalId || typeof goalId !== 'string') {
    throw new AppError('Invalid goal ID', 400);
  }
  const goal = await findGoalsbyIDService(userId, goalId);
  res.status(200).json({
    success: true,
    data: goal,
  });
};

//Controller for updating goals by specific ID
export const updateGoals = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const goalId = req.params.id;
  const payload = req.body as IUpdateGoalsDTO;
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!goalId || typeof goalId !== 'string') {
    throw new AppError('Invalid goal ID', 400);
  }
  const goal = await updateUserGoalService(userId, goalId, payload);
  res.status(200).json({
    success: true,
    data: goal,
  });
};

//Controller for deleting goals by a specific ID
export const deleteGoals = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const goalId = req.params.id;
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!goalId || typeof goalId !== 'string') {
    throw new AppError('Invalid goal ID', 400);
  }
  await deleteUserGoalService(userId, goalId);
  res.status(204).send();
};
