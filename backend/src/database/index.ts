import { sequelize } from './sequelize';
import './models';

export async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (error) {
    process.exit(1);
  }
}
