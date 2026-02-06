import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/auth.repository';
import { AppError } from '../utils/error';
import { signToken } from '../utils/jwt';
import { IRegisterInputDTO, ILoginInputDTO } from '../dtos/auth.dto';

//Register New User
export async function registerUserService(data: IRegisterInputDTO) {
  const { email: inputEmail, name, password } = data;

  if (!inputEmail || !password || !name) {
    throw new AppError('Email, name, and password are required', 400);
  }

  const email = inputEmail.trim().toLowerCase();

  const userExists = await findUserByEmail(email);
  if (userExists) {
    throw new AppError('User already exists', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser({
    email,
    name,
    passwordHash,
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

//Login Existing User and send Access Token
export async function loginUserService(data: ILoginInputDTO) {
  const { email: inputEmail, password } = data;

  if (!inputEmail || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const email = inputEmail.trim().toLowerCase();

  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
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
