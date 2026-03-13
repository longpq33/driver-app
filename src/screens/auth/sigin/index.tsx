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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import Input from '@/components/input';
import Button from '@/components/button';
import { useOtpStore } from '@/store/otpStore';
import { sendOtpSchema, SendOtpInput } from '@/types/auth';
import { COLORS } from '@/themes/colors';
import { AuthStackParamList } from '@/navigation/auth-navigation';

type SiginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SignIn'
>;

function SiginScreen() {
  const navigation = useNavigation<SiginScreenNavigationProp>();
  const setConfirmation = useOtpStore((state) => state.setConfirmation);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOtpInput>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (data: SendOtpInput) => {
    setIsLoading(true);
    try {
      // Format phone with country code
      let formattedPhone = data.phone;
      if (!data.phone.startsWith('+')) {
        formattedPhone = '+84' + data.phone.replace(/^0/, '');
      }

      // Send OTP via Firebase
      const confirmationResult = await auth().signInWithPhoneNumber(formattedPhone);

      // Save confirmation to store
      setConfirmation(confirmationResult, data.phone, 'login');

      // Navigate to OTP screen
      navigation.navigate('OtpInput', { phone: data.phone, type: 'login' });
    } catch (err: any) {
      console.log('Send OTP error:', err);
      const errorMessage = err?.message || 'Failed to send OTP. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
        <Text style={styles.title}>NeedNow Driver</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.contentContainer}>
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

          {/* Send OTP Button */}
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
        </View>

        {/* Links */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.linkText}>
              Don't have an account?{' '}
              <Text style={styles.linkTextBold}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SiginScreen;
