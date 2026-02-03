import { Workout } from '../database/models';
import { ICreateWorkoutDTO } from '../dtos/workout.dto';
export async function createWorkout(data: ICreateWorkoutDTO & { userId: string }) {
  return Workout.create(data);
}

export async function findWorkoutsByUserId(userId: string) {
  return Workout.findAll({
    where: { userId },
  });
}
