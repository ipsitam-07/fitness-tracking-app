import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';
import { GoalType, GoalStatus } from '../../enums/goals';

interface GoalAttributes {
  id: string;
  userId: string;
  goalType: GoalType;
  targetValue: number;
  currentValue: number;
  startingValue?: number;
  startDate: Date;
  endDate: Date;
  status: GoalStatus;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface GoalCreationAttributes extends Optional<GoalAttributes, 'id' | 'status'> {}

export class Goal extends Model<GoalAttributes, GoalCreationAttributes> implements GoalAttributes {
  public id!: string;
  public userId!: string;
  public goalType!: GoalType;
  public targetValue!: number;
  public currentValue!: number;
  public startingValue?: number;
  public startDate!: Date;
  public endDate!: Date;
  public status!: GoalStatus;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProgress(): number {
    if (this.goalType === GoalType.WEIGHT && this.startingValue) {
      // For weight loss: progress based on how much you've lost not gain
      const totalToLose = this.startingValue - this.targetValue;
      const amountLost = this.startingValue - this.currentValue;

      if (totalToLose <= 0) return 100;

      return Math.min((amountLost / totalToLose) * 100, 100);
    }

    // For other goals, higher current value = more progress
    return Math.min((this.currentValue / this.targetValue) * 100, 100);
  }

  public isCompleted(): boolean {
    return this.currentValue >= this.targetValue;
  }

  public getDaysRemaining(): number {
    const now = new Date();
    const end = new Date(this.endDate);
    const diffTime = end.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
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
    goalType: {
      type: DataTypes.ENUM(...Object.values(GoalType)),
      allowNull: false,
    },
    targetValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    currentValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(GoalStatus)),
      allowNull: false,
      defaultValue: GoalStatus.ACTIVE,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'goals',
    timestamps: true,
    indexes: [
      {
        fields: ['userId', 'status'],
      },
    ],
  },
);
