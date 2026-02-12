import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';

// Mock repository
vi.mock('../../src/repositories/auth.repository', () => ({
  findUserByEmail: vi.fn(),
  createUser: vi.fn(),
}));

// Mock bcrypt
vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

// Mock jwt util
vi.mock('../../src/utils/jwt', () => ({
  signToken: vi.fn(),
}));
import { findUserByEmail, createUser } from '../../src/repositories/auth.repository';
import bcrypt from 'bcrypt';
import { signToken } from '../../src/utils/jwt';
import { registerUserService } from '../../src/services/auth.service';
import { loginUserService } from '../../src/services/auth.service';

//---REGISTER--
//1. Error path testing

//Missing creds

describe('Auth Service - Register', () => {
  it('should throw error if email is missing', async () => {
    const input = {
      email: '',
      name: 'Test User',
      password: 'password123',
    };

    await expect(registerUserService(input as any)).rejects.toThrow(
      'Email, name, and password are required',
    );
  });
});

//Duplicate user

describe('Auth Service - Register', () => {
  it('should throw error if user already exists', async () => {
    (findUserByEmail as any).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
    });

    const input = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    };

    await expect(registerUserService(input as any)).rejects.toThrow('User already exists');
  });
});

//2. Happy path testing
//Successful registeration
it('should register a new user successfully', async () => {
  (findUserByEmail as any).mockResolvedValue(null);

  (bcrypt.hash as any).mockResolvedValue('hashedPassword');

  (createUser as any).mockResolvedValue({
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    passwordHash: 'hashedPassword',
  });

  const input = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123',
  };

  const result = await registerUserService(input as any);

  expect(result).toEqual({
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
  });
  expect(findUserByEmail).toHaveBeenCalledWith('test@example.com');
  expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
  expect(createUser).toHaveBeenCalledWith({
    email: 'test@example.com',
    name: 'Test User',
    passwordHash: 'hashedPassword',
  });
});

//---LOGIN---
//1. Error path testing

//Missing credentials

describe('Auth Service - Login', () => {
  it('should throw error if email or password missing', async () => {
    await expect(loginUserService({ email: '', password: '' } as any)).rejects.toThrow(
      'Email and password are required',
    );
  });
});

//User not found test
it('should throw error if user not found', async () => {
  (findUserByEmail as any).mockResolvedValue(null);

  await expect(
    loginUserService({
      email: 'test@example.com',
      password: 'password123',
    } as any),
  ).rejects.toThrow('Invalid credentials');
});

//wrong password
it('should throw error if password is incorrect', async () => {
  (findUserByEmail as any).mockResolvedValue({
    id: '1',
    email: 'test@example.com',
    passwordHash: 'hashedPassword',
  });

  (bcrypt.compare as any).mockResolvedValue(false);

  await expect(
    loginUserService({
      email: 'test@example.com',
      password: 'wrongpassword',
    } as any),
  ).rejects.toThrow('Invalid credentials');
});

//2. Happy path testing
//Successful login
it('should login user successfully', async () => {
  (findUserByEmail as any).mockResolvedValue({
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    passwordHash: 'hashedPassword',
  });

  (bcrypt.compare as any).mockResolvedValue(true);

  (signToken as any).mockReturnValue('fakeToken');

  const result = await loginUserService({
    email: 'test@example.com',
    password: 'password123',
  } as any);

  expect(result).toEqual({
    accessToken: 'fakeToken',
    user: {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
    },
  });

  expect(signToken).toHaveBeenCalledWith({ userId: '123' });
});
