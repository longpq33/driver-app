import { StyleSheet } from 'react-native';
import { COLORS } from '@/themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 40,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#fff',
    opacity: 0.9,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
    width: '100%',
  },
  loader: {
    marginTop: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
  },
  linkText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
