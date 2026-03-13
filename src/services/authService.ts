import axiosClient from '@/config/axiosClient';
import { API_ENDPOINTS } from '@/constants';
import {
  LoginInput,
  RegisterInput,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  LoginWithOtpInput,
  RegisterWithOtpInput,
  LoginWithFirebaseRequest,
  RegisterWithFirebaseRequest,
} from '@/types/auth';

// Response types
interface SendOtpResponse {
  success: boolean;
  message: string;
  data: {
    registered: boolean;
  };
}

interface LoginWithOtpResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      phone: string;
      name: string;
      email?: string;
      avatar?: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

interface RegisterWithOtpResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      phone: string;
      name: string;
      email?: string;
      avatar?: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export const authService = {
  // ==================== Password Auth ====================

  /**
   * Login with phone and password
   */
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },

  /**
   * Register new driver account with password
   */
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  // ==================== Check Existence ====================

  /**
   * Check if phone or email already exists
   */
  checkExistence: async (phone?: string, email?: string) => {
    const response = await axiosClient.post(
      API_ENDPOINTS.AUTH.CHECK_EXISTENCE,
      { phone, email }
    );
    return response.data;
  },

  // ==================== OTP Auth ====================

  /**
   * Send OTP for login
   */
  sendLoginOtp: async (phone: string): Promise<SendOtpResponse> => {
    const response = await axiosClient.post<SendOtpResponse>(
      API_ENDPOINTS.AUTH.SEND_LOGIN_OTP,
      { phone }
    );
    return response.data;
  },

  /**
   * Send OTP for registration
   */
  sendRegisterOtp: async (phone: string): Promise<SendOtpResponse> => {
    const response = await axiosClient.post<SendOtpResponse>(
      API_ENDPOINTS.AUTH.SEND_REGISTER_OTP,
      { phone }
    );
    return response.data;
  },

  /**
   * Resend OTP
   */
  resendOtp: async (
    phone: string,
    type: 'login' | 'register'
  ): Promise<SendOtpResponse> => {
    const response = await axiosClient.post<SendOtpResponse>(
      API_ENDPOINTS.AUTH.RESEND_OTP,
      { phone, type }
    );
    return response.data;
  },

  /**
   * Login with phone and OTP (old way)
   */
  loginWithOtp: async (data: LoginWithOtpInput): Promise<LoginWithOtpResponse> => {
    const response = await axiosClient.post<LoginWithOtpResponse>(
      API_ENDPOINTS.AUTH.LOGIN_WITH_OTP,
      data
    );
    return response.data;
  },

  /**
   * Login with Firebase Auth (new way - Firebase token)
   */
  loginWithFirebase: async (data: LoginWithFirebaseRequest): Promise<LoginWithOtpResponse> => {
    const response = await axiosClient.post<LoginWithOtpResponse>(
      API_ENDPOINTS.AUTH.LOGIN_WITH_FIREBASE,
      data
    );
    return response.data;
  },

  /**
   * Register with phone and OTP (old way)
   */
  registerWithOtp: async (data: RegisterWithOtpInput): Promise<RegisterWithOtpResponse> => {
    const response = await axiosClient.post<RegisterWithOtpResponse>(
      API_ENDPOINTS.AUTH.REGISTER_WITH_OTP,
      data
    );
    return response.data;
  },

  /**
   * Register with Firebase Auth (new way - Firebase token)
   */
  registerWithFirebase: async (data: RegisterWithFirebaseRequest): Promise<RegisterWithOtpResponse> => {
    console.log('====> Registering with Firebase token:', data);
    const response = await axiosClient.post<RegisterWithOtpResponse>(
      API_ENDPOINTS.AUTH.REGISTER_WITH_FIREBASE,
      data
    );
    return response.data;
  },

  // ==================== Token Management ====================

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

  // ==================== Password Reset ====================

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

// Export response types for use in hooks
export type { SendOtpResponse, LoginWithOtpResponse, RegisterWithOtpResponse };
