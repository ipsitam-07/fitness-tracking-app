import { Workout } from '../database/models';
import { ICreateWorkoutDTO, IUpdateWorkoutDTO } from '../dtos/workout.dto';

//Create workout for authenticated user
export async function createWorkout(data: ICreateWorkoutDTO & { userId: string }) {
  return Workout.create(data);
}

//Find all workouts of the user by authenticated user id
export async function findWorkoutsByUserId(userId: string) {
  return Workout.findAll({
    where: { userId },
  });
}

//Find workout of the authenticated user using workout id
export async function findWorkoutbyWorkoutID(workoutId: string) {
  return Workout.findByPk(workoutId);
}

//Update workout of the authenticated user using workout id
export async function updateWorkoutbyID(id: string, data: IUpdateWorkoutDTO) {
  return Workout.update(data, {
    where: { id },
  });
}

//Delete workout of an user by using workout id
export async function deleteWorkoutbyID(id: string) {
  return Workout.destroy({
    where: { id },
  });
}
