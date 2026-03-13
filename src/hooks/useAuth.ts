import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import {
  LoginInput,
  RegisterInput,
  LoginWithOtpInput,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
} from '@/types/auth';
import { STORAGE_KEYS } from '@/constants';
import type { LoginWithOtpResponse, RegisterWithOtpResponse } from '@/services/authService';

const AUTH_QUERY_KEY = 'auth';

import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

// ==================== Password Auth ====================

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: async (data) => {
      setUser(data.data.user);

      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.data.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.data.refreshToken);

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
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: async (data) => {
      setUser(data.data.user);

      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.data.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.data.refreshToken);
      storage.set(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
  });
};

// ==================== OTP Auth ====================

/**
 * Send OTP for login
 */
export const useSendLoginOtp = () => {
  return useMutation({
    mutationFn: (phone: string) => authService.sendLoginOtp(phone),
  });
};

/**
 * Send OTP for registration
 */
export const useSendRegisterOtp = () => {
  return useMutation({
    mutationFn: (phone: string) => authService.sendRegisterOtp(phone),
  });
};

/**
 * Resend OTP
 */
export const useResendOtp = () => {
  return useMutation({
    mutationFn: ({
      phone,
      type,
    }: {
      phone: string;
      type: 'login' | 'register';
    }) => authService.resendOtp(phone, type),
  });
};

/**
 * Login with OTP
 */
export const useLoginWithOtp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginWithOtpInput) => authService.loginWithOtp(data),
    onSuccess: async (data: LoginWithOtpResponse) => {
      setUser(data.data.user);

      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.data.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.data.refreshToken);
      storage.set(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.log('Login with OTP failed', error);
    },
  });
};

/**
 * Register with OTP
 */
export const useRegisterWithOtp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { phone: string; otp: string; name: string; email?: string }) =>
      authService.registerWithOtp(data),
    onSuccess: async (data: RegisterWithOtpResponse) => {
      setUser(data.data.user);

      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.data.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.data.refreshToken);
      storage.set(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.log('Register with OTP failed', error);
    },
  });
};

// ==================== Logout ====================

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

  logoutStore();
  queryClient.clear();
  clearStorage();
};

// ==================== Query Keys ====================

export const authKeys = {
  all: [AUTH_QUERY_KEY] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// ==================== Password Reset ====================

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
