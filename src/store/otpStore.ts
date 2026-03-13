import { create } from 'zustand';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type ConfirmationResult = FirebaseAuthTypes.ConfirmationResult;

interface OtpStore {
  confirmation: ConfirmationResult | null;
  phone: string;
  type: 'login' | 'register';
  setConfirmation: (confirmation: ConfirmationResult | null, phone: string, type: 'login' | 'register') => void;
  clearConfirmation: () => void;
}

export const useOtpStore = create<OtpStore>((set) => ({
  confirmation: null,
  phone: '',
  type: 'login',
  setConfirmation: (confirmation, phone, type) => set({ confirmation, phone, type }),
  clearConfirmation: () => set({ confirmation: null, phone: '', type: 'login' }),
}));
