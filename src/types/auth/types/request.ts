// Login requests
export interface LoginRequest {
  phone: string;
  password: string;
}

// Login with OTP (old way - with manual OTP)
export interface LoginWithOtpRequest {
  phone: string;
  otp: string;
  firebaseVerificationId: string;
}

// Login with Firebase Auth (new way - with Firebase token)
export interface LoginWithFirebaseRequest {
  phone: string;
  firebaseToken: string;
}

// Register requests
export interface RegisterRequest {
  phone: string;
  password: string;
  name: string;
  email?: string;
}

// Register with Firebase Auth
export interface RegisterWithFirebaseRequest {
  phone: string;
  name: string;
  email?: string;
  firebaseToken: string;
}

// Token requests
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Password requests
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface ResetPasswordRequest {
  phone: string;
  otp: string;
  newPassword: string;
}
