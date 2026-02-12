import api from '../config/axio';
import type { User } from '@/types/user.types';

export async function getCurrentUser(): Promise<User> {
  const res = await api.get('/users/me');

  if (res.data.success && res.data.data) {
    return res.data.data;
  }

  return res.data;
}

export async function updateCurrentUser(payload: Partial<User>): Promise<User> {
  const res = await api.patch('/users/me', payload);

  if (res.data.success && res.data.data) {
    return res.data.data;
  }

  return res.data;
}
