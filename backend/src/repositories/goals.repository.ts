import { Goal } from '../database/models';
import { ICreateGoalsDTO } from '../dtos/goals.dto';

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
