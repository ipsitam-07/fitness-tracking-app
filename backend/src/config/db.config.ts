import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
}

const dbConfig: DatabaseConfig = {
  dbName: process.env.DB_NAME!,
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,
  dbHost: process.env.DB_HOST!,
};

export default dbConfig;
