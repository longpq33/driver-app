import { create } from 'zustand';
import { User } from '../types/auth';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  (set) => ({
    isLoggedIn: false,
    isLoading: false,
    user: null,

    setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),

    setUser: (user: User | null) => set({ user }),

    setIsLoading: (value: boolean) => set({ isLoading: value }),

    logout: () =>
      set({
        isLoggedIn: false,
        user: null,
      }),
  })
);
