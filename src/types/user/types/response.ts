import { DriverUser } from './user';

// Response types for user profile operations

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: DriverUser;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: DriverUser;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface UploadAvatarResponse {
  success: boolean;
  message: string;
  data: {
    avatar: string;
  };
}
