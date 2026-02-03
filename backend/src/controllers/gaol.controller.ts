import { response, Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { createGoalsService, getGoalsService } from '../services/goal.service';
import { ICreateGoalsDTO } from '../dtos/goals.dto';
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

  return res.status(200).json({
    success: true,
    data: goals,
  });
};
