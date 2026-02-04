import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { getWorkoutStatsService } from '../services/stats.service';
import { AppError } from '../utils/error';
import { getDashboardStatsService } from '../services/stats.service';

export const getWorkoutStats = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const { startDate, endDate } = req.query;

  const stats = await getWorkoutStatsService(
    userId,
    startDate ? new Date(startDate as string) : undefined,
    endDate ? new Date(endDate as string) : undefined,
  );

  res.status(200).json({
    success: true,
    data: stats,
  });
};

//Controller for getting dashboard summary
export const getDashboardStats = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const stats = await getDashboardStatsService(userId);

  res.status(200).json({
    success: true,
    data: stats,
  });
};
