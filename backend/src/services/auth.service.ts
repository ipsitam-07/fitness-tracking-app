import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/auth.repository';
import { AppError } from '../utils/error';

interface IRegisterInput {
  email: string;
  name: string;
  password: string;
}

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
