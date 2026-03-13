// API Configuration
export const API_BASE_URL = 'http://10.0.2.2:3000';
export const API_TIMEOUT = 30000;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGIN_WITH_OTP: '/api/auth/login-with-otp',
    LOGIN_WITH_FIREBASE: '/api/auth/login-with-firebase',
    REGISTER: '/api/auth/register',
    REGISTER_WITH_OTP: '/api/auth/register-with-otp',
    REGISTER_WITH_FIREBASE: '/api/auth/register-with-firebase',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    VERIFY_OTP: '/api/auth/verify-otp',
    RESET_PASSWORD: '/api/auth/reset-password',
    // OTP Endpoints (for backward compatibility)
    SEND_LOGIN_OTP: '/api/auth/send-login-otp',
    SEND_REGISTER_OTP: '/api/auth/send-register-otp',
    RESEND_OTP: '/api/auth/resend-otp',
    // Check existence
    CHECK_EXISTENCE: '/api/auth/check-existence',
  },
  USERS: {
    PROFILE: '/api/users/profile',
    CHANGE_PASSWORD: '/api/users/password',
  },
} as const;
