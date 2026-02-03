import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { createGoalsService } from '../services/goal.service';
import { ICreateGoalsDTO } from '../dtos/goals.dto';

//Controller for goal creation
export const createGoals = async (req: IAuthRequest, res: Response) => {
  const gaols = await createGoalsService(req.user!.id, req.body as ICreateGoalsDTO);

  res.status(201).json({
    success: true,
    data: gaols,
  });
};
