import { Op } from 'sequelize';
import { Workout } from '../database/models';

//Get workout statistics for an user within a date range
export async function getWorkoutStats(userId: string, startDate?: Date, endDate?: Date) {
  const where: any = { userId };

  if (startDate || endDate) {
    where.date = {};
    if (startDate) {
      where.date[Op.gte] = startDate;
    }
    if (endDate) {
      where.date[Op.gte] = endDate;
    }
  }

  return Workout.findAll({ where });
}
