import { Goal } from '../database/models';
import { IUpdateGoalsDTO, ICreateGoalsDTO } from '../dtos/goals.dto';
import { Op } from 'sequelize';
import { GoalFilters } from '../interfaces/goals';

//Create goals for authenticated user
export async function createGoal(
  data: ICreateGoalsDTO & {
    userId: string;
  },
) {
  return Goal.create(data);
}

export async function getGoalbyUserID(filters: GoalFilters) {
  const { userId, search, type, status, startDate, endDate, limit, offset } = filters;

  const whereClause: any = { userId };

  if (search) {
    whereClause[Op.or] = [{ type: { [Op.iLike]: `%${search}%` } }];
  }

  if (type) whereClause.goalType = type;
  if (status) whereClause.status = status;

  if (startDate && endDate) {
    whereClause.startDate = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    whereClause.createdAt = { [Op.gte]: new Date(startDate) };
  }

  return Goal.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });
}
export async function getGoalsbyGoalID(goalId: string) {
  return Goal.findByPk(goalId);
}

export function updateGoal(goal: Goal, payload: IUpdateGoalsDTO) {
  return goal.update(payload);
}

export function deleteGoal(goal: Goal) {
  return goal.destroy();
}
