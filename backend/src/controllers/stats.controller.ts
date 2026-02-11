import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { getWorkoutStatsService } from '../services/stats.service';
import { AppError } from '../utils/error';
import {
  getDashboardStatsService,
  getWeeklyTrendsService,
  getGoalProgressService,
} from '../services/stats.service';

export const getWorkoutStats = async (req: IAuthRequest, res: Response) => {
  const userId = req.user!.id;

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
  const userId = req.user!.id;

  const stats = await getDashboardStatsService(userId);

  res.status(200).json({
    success: true,
    data: stats,
  });
};

//Controller for getting weekly workout trends
export const getWeeklyTrends = async (req: IAuthRequest, res: Response) => {
  const userId = req.user!.id;

  const weeks = req.query.weeks ? parseInt(req.query.weeks as string, 10) : 4;

  const trends = await getWeeklyTrendsService(userId, weeks);

  res.status(200).json({
    success: true,
    data: trends,
  });
};

//Controller for getting goal progress
export const getGoalProgress = async (req: IAuthRequest, res: Response) => {
  const userId = req.user!.id;
  const goalId = req.params.id as string;

  const progress = await getGoalProgressService(userId, goalId);

  res.status(200).json({
    success: true,
    data: progress,
  });
};
