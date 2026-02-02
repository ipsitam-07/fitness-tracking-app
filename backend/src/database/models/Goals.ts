import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

export type GoalType = 'workouts_per_week' | 'calories_per_week' | 'weight';

interface GoalAttributes {
  id: string;
  userId: string;
  type: GoalType;
  targetValue: number;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'completed';
}

interface GoalCreationAttributes extends Optional<GoalAttributes, 'id' | 'status'> {}

export class Goal extends Model<GoalAttributes, GoalCreationAttributes> implements GoalAttributes {
  public id!: string;
  public userId!: string;
  public type!: GoalType;
  public targetValue!: number;
  public startDate!: Date;
  public endDate?: Date;
  public status!: 'active' | 'completed';
}

Goal.init(
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
      type: DataTypes.ENUM('workouts_per_week', 'calories_per_week', 'weight'),
      allowNull: false,
    },
    targetValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'completed'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'goals',
  },
);
