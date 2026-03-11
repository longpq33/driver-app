import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
  AuthResponse,
} from '../types/auth';
import { STORAGE_KEYS } from '../config/constants';

const AUTH_QUERY_KEY = 'auth';

import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV()

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: async (data: AuthResponse) => {
      setUser(data.data.user);

      // Lưu vào AsyncStorage
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data?.data.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data?.data.refreshToken);

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.log('onError failed', error);
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: async (data) => {
      setUser(data.data.user);

      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.data.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.data.refreshToken);
      storage.set(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
  });
};

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const clearStorage = async () => {
    try {
      const keys = [
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER,
      ];
      storage.remove(keys[0]);
      storage.remove(keys[1]);
      storage.remove(keys[2]);
    } catch (error) {
      console.warn('Failed to clear AsyncStorage:', error);
    }
  };

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
    },
    onError: () => {
      // Vẫn logout local nếu API fail
      logoutStore();
    },
    onSettled: async () => {
      // Clear AsyncStorage
      await clearStorage();
    },
  });
};

// Query key cho auth
export const authKeys = {
  all: [AUTH_QUERY_KEY] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Forgot Password hooks
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authService.forgotPassword(data),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authService.verifyOtp(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
  });
};
