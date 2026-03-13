// Driver-specific user type
export interface DriverUser {
  id: string;
  phone: string;
  name: string;
  email?: string;
  avatar?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
  // Driver-specific fields
  licenseNumber?: string;
  licenseExpiryDate?: string;
  vehicleType?: 'car' | 'motorcycle' | 'bicycle';
  vehiclePlate?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
}

export default DriverUser;
