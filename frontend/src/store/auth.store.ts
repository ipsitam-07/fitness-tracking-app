import { create } from 'zustand';
import { getToken, setToken, clearToken } from '@/utils/storage';
import type { User } from '@/types/auth.types';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;

  setAuthToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getToken()),
  user: null,

  setAuthToken: (token: string) => {
    setToken(token);
    set({ isAuthenticated: true });
  },

  setUser: (user: User) => {
    set({ user });
  },

  logout: () => {
    clearToken();
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
