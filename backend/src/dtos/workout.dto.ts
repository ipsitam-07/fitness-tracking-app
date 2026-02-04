import { ExerciseType } from '../database/models/Workout';

export interface ICreateWorkoutDTO {
  exerciseType: ExerciseType;
  exerciseName: string;
  duration: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}
export interface IUpdateWorkoutDTO {
  exerciseType?: ExerciseType;
  exerciseName?: string;
  duration?: number;
  caloriesBurned?: number;
  date?: Date;
  notes?: string;
}
