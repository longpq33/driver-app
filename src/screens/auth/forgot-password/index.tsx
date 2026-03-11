import React, { useState } from 'react';
import {
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import Input from '../../../components/input';
import Button from '../../../components/button';
import {
  useForgotPassword,
  useVerifyOtp,
  useResetPassword,
} from '../../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthStackParamList = {
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

type Step = 'phone' | 'otp' | 'newPassword';

function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const forgotPasswordMutation = useForgotPassword();
  const verifyOtpMutation = useVerifyOtp();
  const resetPasswordMutation = useResetPassword();

  const handleSendOtp = () => {
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    forgotPasswordMutation.mutate(
      { phone },
      {
        onSuccess: () => {
          Alert.alert(
            'OTP Sent',
            'Please check your phone for the verification code'
          );
          setStep('otp');
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to send OTP. Please try again.';
          Alert.alert('Error', errorMessage);
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP code');
      return;
    }

    if (otp.length < 4) {
      Alert.alert('Error', 'Please enter a valid OTP code');
      return;
    }

    verifyOtpMutation.mutate(
      { phone, otp },
      {
        onSuccess: (data) => {
          if (data.valid) {
            setStep('newPassword');
          } else {
            Alert.alert('Error', 'Invalid OTP code. Please try again.');
          }
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            'Invalid OTP. Please try again.';
          Alert.alert('Error', errorMessage);
        },
      }
    );
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    resetPasswordMutation.mutate(
      { phone, otp, newPassword },
      {
        onSuccess: () => {
          Alert.alert(
            'Success',
            'Your password has been reset successfully!',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('SignIn');
                },
              },
            ]
          );
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to reset password. Please try again.';
          Alert.alert('Error', errorMessage);
        },
      }
    );
  };

  const handleGoToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const isLoading =
    forgotPasswordMutation.isPending ||
    verifyOtpMutation.isPending ||
    resetPasswordMutation.isPending;

  const renderStep = () => {
    switch (step) {
      case 'phone':
        return (
          <>
            <View style={styles.inputContainer}>
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={forgotPasswordMutation.isPending ? 'Sending...' : 'Send OTP'}
                onPress={handleSendOtp}
                disabled={forgotPasswordMutation.isPending}
              />
            </View>
          </>
        );

      case 'otp':
        return (
          <>
            <Text style={styles.infoText}>
              We sent a verification code to {phone}
            </Text>
            <View style={styles.inputContainer}>
              <Input
                label="OTP Code"
                placeholder="Enter the OTP code"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={verifyOtpMutation.isPending ? 'Verifying...' : 'Verify OTP'}
                onPress={handleVerifyOtp}
                disabled={verifyOtpMutation.isPending}
              />
            </View>
            <TouchableOpacity
              style={styles.resendContainer}
              onPress={handleSendOtp}
              disabled={forgotPasswordMutation.isPending}
            >
              <Text style={styles.resendText}>
                Didn't receive the code?{' '}
                <Text style={styles.linkText}>Resend</Text>
              </Text>
            </TouchableOpacity>
          </>
        );

      case 'newPassword':
        return (
          <>
            <Text style={styles.infoText}>Enter your new password</Text>
            <View style={styles.inputContainer}>
              <Input
                label="New Password"
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Confirm Password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
                onPress={handleResetPassword}
                disabled={resetPasswordMutation.isPending}
              />
            </View>
          </>
        );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          {step === 'phone' && 'Enter your phone number to reset password'}
          {step === 'otp' && 'Enter the verification code'}
          {step === 'newPassword' && 'Create a new password'}
        </Text>

        {renderStep()}

        {isLoading && (
          <ActivityIndicator
            style={styles.loader}
            size="small"
            color="#007AFF"
          />
        )}

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Remember your password? </Text>
          <TouchableOpacity onPress={handleGoToSignIn}>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ForgotPasswordScreen;
