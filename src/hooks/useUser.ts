import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { authKeys } from './useAuth';
import { UpdateProfileRequest, ChangePasswordRequest } from '../types/auth';

const USER_QUERY_KEY = 'user';

// Queries
export const useGetProfile = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => userService.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Mutations
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userService.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Cập nhật cache
      queryClient.setQueryData(authKeys.user(), updatedUser);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => userService.changePassword(data),
  });
};

// Query keys cho user
export const userKeys = {
  all: [USER_QUERY_KEY] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
};
