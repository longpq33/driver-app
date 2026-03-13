export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  avatar?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar?: string;
}
