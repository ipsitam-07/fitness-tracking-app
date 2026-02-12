import { sequelize } from './sequelize';
import './models';
export async function connectDB() {
  try {
    await sequelize.authenticate();

    if (process.env.NODE_ENV === 'test') {
      await sequelize.sync({ force: true });
    } else {
      await sequelize.sync({ alter: true });
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    // process.exit(1);
  }
}
