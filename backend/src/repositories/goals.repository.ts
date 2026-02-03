import { Goal } from '../database/models';
import { ICreateGoalsDTO, IUpdateGoalsDTO } from '../dtos/goals.dto';

//Create goals for authenticated user
export async function createGoal(
  data: ICreateGoalsDTO & {
    userId: string;
  },
) {
  return Goal.create(data);
}

export async function getGoalbyUserID(userId: string) {
  return Goal.findAll({
    where: { userId },
  });
}

export async function getGoalsbyGoalID(goalId: string) {
  return Goal.findByPk(goalId);
}

export function updateGoal(goal: Goal, payload: IUpdateGoalsDTO) {
  return goal.update(payload);
}
