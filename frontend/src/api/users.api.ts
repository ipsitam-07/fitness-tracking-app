import api from './axio';
import type { User } from '@/types/user.types';

export async function getCurrentUser(): Promise<User> {
  const res = await api.get('/users/me');
  return res.data;
}

export async function updateCurrentUser(payload: Partial<User>): Promise<User> {
  const res = await api.patch('/users/me', payload);
  return res.data.data;
}
