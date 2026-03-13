// Request types for user profile operations

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar?: string;
  licenseNumber?: string;
  licenseExpiryDate?: string;
  vehicleType?: 'car' | 'motorcycle' | 'bicycle';
  vehiclePlate?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UploadAvatarRequest {
  uri: string;
  fileName?: string;
  type?: string;
}
