import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/auth.repository';
import { AppError } from '../utils/error';
import authConfig from '../config/auth.config';
import { signToken } from '../utils/jwt';

interface IRegisterInput {
  email: string;
  name: string;
  password: string;
}

interface ILoginInput {
  email: string;
  password: string;
}
//Register New User
export async function registerUserService({ email, name, password }: IRegisterInput) {
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const userExists = await findUserByEmail(email);

  if (userExists) {
    throw new AppError('User already exists', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return createUser({
    email,
    name,
    passwordHash,
  });
}

//Login Existing User and send Access Token
export async function loginUserService({ email, password }: ILoginInput) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError('Invalid credentials', 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError('Invalid password', 400);
  }

  const accessToken = signToken({ userId: user.id });
  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
