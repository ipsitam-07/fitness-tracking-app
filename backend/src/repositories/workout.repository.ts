import { Workout } from '../database/models';
import { ICreateWorkoutDTO, IUpdateWorkoutDTO } from '../dtos/workout.dto';
import { Op } from 'sequelize';
import { WorkoutFilters } from '../interfaces/workout';

//Create workout for authenticated user
export async function createWorkout(data: ICreateWorkoutDTO & { userId: string }) {
  return Workout.create(data);
}

//Find all workouts of the user by authenticated user id
export async function findWorkoutsByUserId(filters: WorkoutFilters) {
  const { userId, limit, offset, search, type, startDate, endDate } = filters;

  const whereClause: any = { userId };

  if (search) {
    whereClause[Op.or] = [
      { exerciseName: { [Op.iLike]: `%${search}%` } },
      { type: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (type) whereClause.type = type;

  if (startDate && endDate) {
    whereClause.date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    whereClause.date = { [Op.gte]: new Date(startDate) };
  }

  return Workout.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [['date', 'DESC']],
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
