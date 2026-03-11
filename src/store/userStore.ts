import { create } from 'zustand';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  vehicleType?: string;
  vehiclePlate?: string;
  rating?: number;
  totalTrips?: number;
  isOnline: boolean;
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  setOnline: (isOnline: boolean) => void;
  fetchProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,
  setProfile: (profile) => set({ profile }),
  updateProfile: (data) => {
    const current = get().profile;
    if (current) set({ profile: { ...current, ...data } });
  },
  setOnline: (isOnline) => {
    const current = get().profile;
    if (current) set({ profile: { ...current, isOnline } });
  },
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Gọi API
      set({
        profile: { id: '1', email: 'driver@example.com', name: 'Driver', phone: '0123456789', isOnline: false },
        isLoading: false,
      });
    } catch (error) {
      console.log({error});
      set({ error: 'Failed to fetch', isLoading: false });
    }
  },
}));
