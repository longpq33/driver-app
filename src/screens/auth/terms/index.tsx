import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@/components/button';
import { COLORS } from '@/themes/colors';
import { AuthStackParamList } from '@/navigation/auth-navigation';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { STORAGE_KEYS } from '@/constants';
import { storage } from '@/hooks/useAuth';
import { useOtpStore } from '@/store/otpStore';

type TermsScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Terms'
>;

type TermsScreenRouteProp = RouteProp<AuthStackParamList, 'Terms'>;

// Terms content - có thể lấy từ API nếu cần
const TERMS_CONTENT = `
TERMS OF SERVICE

Last updated: January 2025

1. Acceptance of Terms
By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.

2. Description of Service
This is a food delivery driver application that allows drivers to receive and manage delivery orders.

3. User Responsibilities
- Provide accurate information
- Maintain account security
- Follow local laws and regulations
- Accept deliveries responsibly

4. Payment Terms
Drivers are paid based on completed deliveries according to the current payment structure.

5. Termination
We reserve the right to terminate your account for violations of these terms.
`;

const PRIVACY_CONTENT = `
PRIVACY POLICY

Last updated: January 2025

1. Information We Collect
- Personal information (name, phone, email)
- Location data
- Device information
- Delivery history

2. How We Use Your Information
- To provide our services
- To improve user experience
- To communicate with you
- For security purposes

3. Data Security
We implement appropriate security measures to protect your personal information.

4. Your Rights
- Access your personal data
- Request data correction
- Request data deletion
- Opt-out of marketing communications

5. Contact Us
For privacy concerns, please contact our support team.
`;

function TermsScreen() {
  const navigation = useNavigation<TermsScreenNavigationProp>();
  const route = useRoute<TermsScreenRouteProp>();
  const { phone, name, email, firebaseToken } = route.params;
  const setUser = useAuthStore((state) => state.setUser);
  const clearConfirmation = useOtpStore((state) => state.clearConfirmation);

  const [isAccepting, setIsAccepting] = React.useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      // Call backend API to complete registration
      const response = await authService.registerWithFirebase({
        phone,
        name,
        email,
        firebaseToken,
      });

      // Save user data
      setUser(response.data.user);
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken || '');
      storage.set(STORAGE_KEYS.USER, JSON.stringify(response.data.user));

      clearConfirmation();

      // Navigate to Main
      const parentNavigation = navigation.getParent();
      if (parentNavigation) {
        parentNavigation.navigate('Main');
      }
    } catch (error: any) {
      console.log('Register error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Registration failed. Please try again.';

      // Handle specific errors
      if (errorMessage.includes('Phone already registered') || errorMessage.includes('Email already registered')) {
        Alert.alert(
          'Registration Failed',
          errorMessage,
          [
            {
              text: 'Go to Sign In',
              onPress: () => {
                clearConfirmation();
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                  })
                );
              },
            },
            {
              text: 'Try Again',
              style: 'cancel',
              onPress: () => {
                // Navigate back to Register screen
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Register' }],
                  })
                );
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDecline = () => {
    clearConfirmation();
    // Navigate back to SignIn
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      })
    );
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      // Handle error
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Terms & Privacy Policy</Text>
        <Text style={styles.subtitle}>
          Please read our terms and privacy policy carefully before continuing.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          <Text style={styles.termsText}>{TERMS_CONTENT}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.termsText}>{PRIVACY_CONTENT}</Text>
        </View>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => handleOpenLink('https://example.com/terms')}>
            <Text style={styles.linkText}>View full Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenLink('https://example.com/privacy')}>
            <Text style={styles.linkText}>View full Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title={isAccepting ? 'Processing...' : 'Accept'}
          onPress={handleAccept}
          disabled={isAccepting}
        />
        <TouchableOpacity
          style={styles.declineButton}
          onPress={handleDecline}
          disabled={isAccepting}
        >
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  termsText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  declineButton: {
    marginTop: 12,
    alignItems: 'center',
    padding: 12,
  },
  declineText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default TermsScreen;
