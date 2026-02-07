import { UpdateUserDTO } from '../dtos/user.dto';
import { findUserById, updateUser } from '../repositories/user.repository';
import { AppError } from '../utils/error';

export async function getCurrentUserService(userId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
}

export async function updateCurrentUserService(userId: string, payload: UpdateUserDTO) {
  if (!payload || Object.keys(payload).length === 0) {
    throw new AppError('No fields provided to update', 400);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (payload.name !== undefined) user.name = payload.name;
  if (payload.weight !== undefined) user.weight = payload.weight;
  if (payload.height !== undefined) user.height = payload.height;
  if (payload.gender !== undefined) user.gender = payload.gender;
  if (payload.age !== undefined) user.age = payload.age;

  return updateUser(user, payload);
}
