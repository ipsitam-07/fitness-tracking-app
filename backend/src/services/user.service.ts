import { findUserById } from '../repositories/auth.repository';
import { AppError } from '../utils/error';

export async function getCurrentUserService(userId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
}
