import { User } from '../database/models';

interface CreateUserInput {
  email: string;
  name: string;
  passwordHash: string;
}

export async function findUserByEmail(email: string) {
  return User.findOne({ where: { email } });
}

export async function createUser(data: CreateUserInput) {
  return User.create(data);
}
