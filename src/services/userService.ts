import axiosClient from '../config/axiosClient';
import { API_ENDPOINTS } from '../config/constants';
import {
  User,
  UpdateProfileRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '../types/auth';

export const userService = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await axiosClient.get<User>(API_ENDPOINTS.USERS.PROFILE);
    return response.data;
  },

  /**
   * Update current user profile
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await axiosClient.patch<User>(
      API_ENDPOINTS.USERS.PROFILE,
      data
    );
    return response.data;
  },

  /**
   * Change user password
   */
  changePassword: async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    const response = await axiosClient.post<ChangePasswordResponse>(
      API_ENDPOINTS.USERS.CHANGE_PASSWORD,
      data
    );
    return response.data;
  },
};

export default userService;
