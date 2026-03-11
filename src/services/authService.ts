import axiosClient from '../config/axiosClient';
import { API_ENDPOINTS } from '../config/constants';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../types/auth';

export const authService = {
  /**
   * Login with phone and password
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },

  /**
   * Register new driver account
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await axiosClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      data
    );
    return response.data;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<{ message: string }> => {
    const response = await axiosClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    return response.data;
  },

  /**
   * Request OTP for forgot password
   */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const response = await axiosClient.post<ForgotPasswordResponse>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );
    return response.data;
  },

  /**
   * Verify OTP code
   */
  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await axiosClient.post<VerifyOtpResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      data
    );
    return response.data;
  },

  /**
   * Reset password with OTP
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    const response = await axiosClient.post<ResetPasswordResponse>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
    return response.data;
  },
};

export default authService;
