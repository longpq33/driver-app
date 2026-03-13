import { StyleSheet } from 'react-native';
import { COLORS } from '@/themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  phone: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    marginBottom: 32,
  },
  otpContainer: {
    marginBottom: 24,
  },
  resendContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  countdownText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
  },
  resendText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
  changePhoneContainer: {
    marginTop: 10,
  },
  changePhoneText: {
    fontSize: 14,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
