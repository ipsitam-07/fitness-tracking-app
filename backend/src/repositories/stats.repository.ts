import { Op } from 'sequelize';
import { Workout } from '../database/models';
import { Goal } from '../database/models';
import { GoalStatus } from '../database/models/Goals';

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

//Get recent workouts of an user
export async function getRecentWorkouts(userId: string, limit: number = 5) {
  return Workout.findAll({
    where: { userId },
    order: [['date', 'DESC']],
    limit,
    attributes: ['id', 'exerciseName', 'exerciseType', 'duration', 'caloriesBurned', 'date'],
  });
}

//Get active goals of an user
export async function getActiveGoals(userId: string) {
  return Goal.count({
    where: {
      userId,
      status: GoalStatus.ACTIVE,
    },
  });
}

//Get completed goals count of an user
export async function getCompletedGoalsCount(userId: string) {
  return Goal.count({
    where: {
      userId,
      status: GoalStatus.COMPLETED,
    },
  });
}

//Get current week workout stats of an user
export async function getThisWeekWorkouts(userId: string) {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  return Workout.findAll({
    where: {
      userId,
      date: {
        [Op.gte]: startOfWeek,
      },
    },
  });
}

//Get current month workout stats of an user
export async function getThisMonthWorkouts(userId: string) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  return Workout.findAll({
    where: {
      userId,
      date: {
        [Op.gte]: startOfMonth,
      },
    },
  });
}

//Get workout stats sorted by weeks
export async function getWorkoutsByWeeks(userId: string, weeks: number = 4) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - weeks * 7);

  return Workout.findAll({
    where: {
      userId,
      date: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    },
    order: [['date', 'ASC']],
  });
}

//Get all workouts sorted by dates
export async function getAllWorkoutsSorted(userId: string) {
  return Workout.findAll({
    where: { userId },
    order: [['date', 'ASC']],
    attributes: ['date'],
  });
}
