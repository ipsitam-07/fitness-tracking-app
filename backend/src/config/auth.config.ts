import dotenv from 'dotenv';

dotenv.config();

interface AuthConfig {
  jwtSkey: string;
  jwtExp: string;
}

const authConfig: AuthConfig = {
  jwtSkey: process.env.JWT_TOKEN as string,
  jwtExp: process.env.EXPIRES_IN as string,
};

export default authConfig;
