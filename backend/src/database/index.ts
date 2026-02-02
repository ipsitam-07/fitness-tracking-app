import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config';

export const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
  host: dbConfig.dbHost,
  dialect: 'postgres',
  logging: false,
});

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}
