import { create } from 'zustand';
import { getToken, setToken, clearToken } from '@/utils/storage';
import type { SignupRequest } from '@/types/auth.types';

type AuthState = {
  isAuthenticated: boolean;
  user: SignupRequest | null;

  setAuthToken: (token: string) => void;
  setUser: (user: SignupRequest) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getToken()),
  user: null,

  setAuthToken: (token: string) => {
    setToken(token);
    set({ isAuthenticated: true });
  },

  setUser: (user: SignupRequest) => {
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
