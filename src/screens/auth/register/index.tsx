import React, { useState } from 'react';
import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import Input from '@/components/input';
import Button from '@/components/button';
import { useOtpStore } from '@/store/otpStore';
import { sendRegisterOtpSchema, SendRegisterOtpInput } from '@/types/auth';
import { COLORS } from '@/themes/colors';
import { AuthStackParamList } from '@/navigation/auth-navigation';
import { authService } from '@/services/authService';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Register'
>;

function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const setConfirmation = useOtpStore((state) => state.setConfirmation);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendRegisterOtpInput>({
    resolver: zodResolver(sendRegisterOtpSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = async (data: SendRegisterOtpInput) => {
    setIsLoading(true);
    try {
      // Check if phone/email already exists
      const checkResponse = await authService.checkExistence(
        data.phone,
        data.email
      );

      if (checkResponse.data.phoneExists) {
        Alert.alert(
          'Phone Already Registered',
          'This phone number is already registered. Please sign in or use a different phone number.',
          [
            { text: 'Go to Sign In', onPress: handleGoToSignIn },
            { text: 'OK', style: 'cancel' },
          ]
        );
        setIsLoading(false);
        return;
      }

      if (checkResponse.data.emailExists) {
        Alert.alert(
          'Email Already Registered',
          'This email is already registered. Please use a different email or sign in.',
          [{ text: 'OK' }]
        );
        setIsLoading(false);
        return;
      }

      // Format phone with country code
      let formattedPhone = data.phone;
      if (!data.phone.startsWith('+')) {
        formattedPhone = '+84' + data.phone.replace(/^0/, '');
      }

      // Send OTP via Firebase
      const confirmationResult = await auth().signInWithPhoneNumber(formattedPhone);

      console.log('=====> confirmationResult:', confirmationResult);
      // Save confirmation to store
      setConfirmation(confirmationResult, data.phone, 'register');

      // Navigate to OTP screen
      navigation.navigate('OtpInput', {
        phone: data.phone,
        type: 'register',
        name: data.name,
        email: data.email || undefined,
      });
    } catch (err: any) {
      console.log('Send OTP error:', err);
      const errorMessage = err?.response?.data?.message || err?.message || 'Failed to send OTP. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToSignIn = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      })
    );
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
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  error={errors.name?.message}
                />
              )}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email (Optional)"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                />
              )}
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  error={errors.phone?.message}
                />
              )}
            />
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? 'Sending OTP...' : 'Send OTP'}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
          {isLoading && (
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color={COLORS.primary}
            />
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleGoToSignIn}>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
