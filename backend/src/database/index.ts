import { sequelize } from './sequelize';
import './models';

export async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connected and synced');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}
