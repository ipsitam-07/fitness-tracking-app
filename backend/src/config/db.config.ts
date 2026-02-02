import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
}

const dbConfig: DatabaseConfig = {
  dbName: process.env.DB_NAME || 'fitness_tracker',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'mindfire',
  dbHost: process.env.DB_HOST || 'postgres',
};

export default dbConfig;
