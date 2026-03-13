import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import OtpInput from '@/components/otpInput';
import { useOtpVerification } from './useOtpVerification';
import { styles } from './styles';
import Button from '@/components/button';
import { COLORS } from '@/themes/colors';

function OtpInputScreen() {
  const {
    otp,
    countdown,
    isLoading,
    routePhone,
    otpInputRef,
    setOtp,
    handleVerifyOtp,
    handleResendOtp,
    handleChangePhone,
  } = useOtpVerification();

  const formatPhoneDisplay = (phone: string) => {
    if (phone.length >= 4) {
      return `*** *** ${phone.slice(-4)}`;
    }
    return phone;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to
        </Text>
        <Text style={styles.phone}>{formatPhoneDisplay(routePhone)}</Text>

        <View style={styles.otpContainer}>
          <OtpInput
            ref={otpInputRef as any}
            length={6}
            onCodeChange={(text: string) => setOtp(text)}
            autoFocus
          />
        </View>

        {/* Countdown / Resend */}
        <View style={styles.resendContainer}>
          {countdown > 0 ? (
            <Text style={styles.countdownText}>
              Resend OTP in {countdown}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOtp} disabled={isLoading}>
              <Text style={styles.resendText}>
                {isLoading ? 'Sending...' : "Didn't receive code? Resend"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Actions */}
        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? 'Verifying...' : 'Verify'}
            onPress={handleVerifyOtp}
            disabled={isLoading || otp.length !== 6}
          />
          {isLoading && (
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color={COLORS.primary}
            />
          )}
        </View>

        {/* Change Phone */}
        <TouchableOpacity onPress={handleChangePhone} style={styles.changePhoneContainer}>
          <Text style={styles.changePhoneText}>Change phone number</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OtpInputScreen;
