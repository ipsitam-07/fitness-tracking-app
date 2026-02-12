import dotenv from 'dotenv';
import { connectDB } from '../../src/database';
import { sequelize } from '../../src/database/sequelize';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await connectDB();
});

afterAll(async () => {
  await sequelize.close();
});
