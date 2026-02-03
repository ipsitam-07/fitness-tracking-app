export interface ICreateWorkoutDTO {
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

export interface IUpdateWorkoutDTO {
  type?: string;
  durationMinutes?: number;
  caloriesBurned?: number;
  date?: Date;
}
