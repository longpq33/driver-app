import { User } from './user';

// Auth responses
export interface AuthResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginWithOtpResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyOtpResponse {
  message: string;
  valid: boolean;
  data?: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ResetPasswordResponse {
  message: string;
}

// API Error
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
