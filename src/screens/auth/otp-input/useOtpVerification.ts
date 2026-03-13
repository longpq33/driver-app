import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { useOtpStore } from '@/store/otpStore';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { STORAGE_KEYS } from '@/constants';
import { storage } from '@/hooks/useAuth';

const OTP_EXPIRY_SECONDS = 60;

type AuthStackParamList = {
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OtpInput: {
    phone: string;
    type: 'login' | 'register';
    name?: string;
    email?: string;
  };
  Terms: {
    phone: string;
    name: string;
    email?: string;
    firebaseToken: string;
  };
  Main: undefined;
};

type OtpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'OtpInput'
>;

type OtpScreenRouteProp = RouteProp<AuthStackParamList, 'OtpInput'>;

export interface UseOtpVerificationReturn {
  // State
  otp: string;
  countdown: number;
  isLoading: boolean;
  routePhone: string;
  otpInputRef: React.RefObject<any>;

  // Actions
  setOtp: (otp: string) => void;
  handleVerifyOtp: () => Promise<void>;
  handleResendOtp: () => Promise<void>;
  handleChangePhone: () => void;
}

export function useOtpVerification(): UseOtpVerificationReturn {
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const route = useRoute<OtpScreenRouteProp>();
  const { phone: routePhone, type, name, email } = route.params;

  const { confirmation, clearConfirmation } = useOtpStore();
  const setUser = useAuthStore((state) => state.setUser);
  const otpInputRef = useRef<any>(null);

  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(OTP_EXPIRY_SECONDS);
  const [isLoading, setIsLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleClearConfirmation = useCallback(() => {
    clearConfirmation();
  }, [clearConfirmation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      handleClearConfirmation();
    };
  }, [handleClearConfirmation]);

  const resetOtpInput = useCallback(() => {
    if (otpInputRef.current?.focus) {
      otpInputRef.current.focus();
    }
  }, []);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
      return;
    }

    if (!confirmation) {
      Alert.alert('Error', 'No confirmation result. Please request OTP again.');
      return;
    }

    setIsLoading(true);

    try {
      // Verify with Firebase using confirmation from store
      const userCredential = await confirmation.confirm(otp);
      if (!userCredential) {
        Alert.alert('Verification Failed', 'Invalid OTP code');
        resetOtpInput();
        setIsLoading(false);
        return;
      }
      const firebaseUser = userCredential.user;

      if (!firebaseUser) {
        Alert.alert('Verification Failed', 'Invalid OTP code');
        resetOtpInput();
        return;
      }

      // Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();

      // Then call backend API
      if (type === 'login') {
        const response = await authService.loginWithFirebase({
          phone: routePhone,
          firebaseToken: idToken,
        });

        // Save user data
        setUser(response.data.user);
        storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
        storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken || '');
        storage.set(STORAGE_KEYS.USER, JSON.stringify(response.data.user));

        clearConfirmation();
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
          parentNavigation.navigate('Main');
        }
      } else {
        // Navigate to Terms screen with Firebase token
        // The actual registration will be completed in Terms screen
        navigation.navigate('Terms', {
          phone: routePhone,
          name: name || '',
          email,
          firebaseToken: idToken,
        });
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Verification failed. Please try again.';
      Alert.alert('Error', errorMessage);
      resetOtpInput();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Format phone with country code
      let formattedPhone = routePhone;
      if (!routePhone.startsWith('+')) {
        formattedPhone = '+84' + routePhone.replace(/^0/, '');
      }

      // Request new OTP from Firebase (force resend)
      await auth().signInWithPhoneNumber(formattedPhone, true);

      setCountdown(OTP_EXPIRY_SECONDS);
      setOtp('');
      Alert.alert('Success', 'OTP has been resent');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to resend OTP';
      Alert.alert('Error', errorMessage);
    }
  };

  const handleChangePhone = () => {
    handleClearConfirmation();
    navigation.goBack();
  };

  return {
    otp,
    countdown,
    isLoading,
    routePhone,
    otpInputRef,
    setOtp,
    handleVerifyOtp,
    handleResendOtp,
    handleChangePhone,
  };
}
