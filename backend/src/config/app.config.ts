import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
  nodEnv: string;
}

const appConfig: AppConfig = {
  port: Number(process.env.PORT) || 4000,
  nodEnv: process.env.NODE_ENV || 'development',
};

export default appConfig;
