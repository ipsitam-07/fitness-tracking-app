import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

interface WorkoutAttributes {
  id: string;
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

interface WorkoutCreationAttributes extends Optional<WorkoutAttributes, 'id'> {}

export class Workout
  extends Model<WorkoutAttributes, WorkoutCreationAttributes>
  implements WorkoutAttributes
{
  public id!: string;
  public userId!: string;
  public type!: string;
  public durationMinutes!: number;
  public caloriesBurned!: number;
  public date!: Date;
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caloriesBurned: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'workouts',
  },
);
