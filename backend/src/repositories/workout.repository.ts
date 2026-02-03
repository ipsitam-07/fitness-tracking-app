import { Workout } from '../database/models';
import { CreateWorkoutDTO } from '../dtos/workout.dto';
export function createWorkout(data: CreateWorkoutDTO & { userId: string }) {
  return Workout.create(data);
}
