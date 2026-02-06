import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  passwordHash: string;

  age?: number | null;
  height?: number | null;
  weight?: number | null;
  gender?: 'male' | 'female' | 'other' | null;

  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<
  UserAttributes,
  'id' | 'age' | 'height' | 'weight' | 'gender'
> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public name!: string;
  public passwordHash!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public age!: number | null;
  public height!: number | null;
  public weight!: number | null;
  public gender!: 'male' | 'female' | 'other' | null;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  },
);
