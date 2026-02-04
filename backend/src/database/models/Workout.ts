import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

export enum ExerciseType {
  CARDIO = 'cardio',
  STRENGTH = 'strength',
  FLEXIBILITY = 'flexibility',
  SPORTS = 'sports',
  OTHER = 'other',
}
interface WorkoutAttributes {
  id: string;
  userId: string;
  exerciseType: ExerciseType;
  exerciseName: string;
  duration: number; // in minutes
  caloriesBurned: number;
  date: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface WorkoutCreationAttributes extends Optional<
  WorkoutAttributes,
  'id' | 'notes' | 'createdAt' | 'updatedAt'
> {}
export class Workout
  extends Model<WorkoutAttributes, WorkoutCreationAttributes>
  implements WorkoutAttributes
{
  public id!: string;
  public userId!: string;
  public exerciseType!: ExerciseType;
  public exerciseName!: string;
  public duration!: number;
  public caloriesBurned!: number;
  public date!: Date;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Workout.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    exerciseType: {
      type: DataTypes.ENUM(...Object.values(ExerciseType)),
      allowNull: false,
    },
    exerciseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    caloriesBurned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'workouts',
    timestamps: true,
    indexes: [
      {
        fields: ['userId', 'date'],
      },
    ],
  },
);
