import { Workout } from '../database/models';
import { ICreateWorkoutDTO } from '../dtos/workout.dto';
export function createWorkout(data: ICreateWorkoutDTO & { userId: string }) {
  return Workout.create(data);
}
