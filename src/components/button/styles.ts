import { StyleSheet } from 'react-native';
import { COLORS } from '@/themes/colors';

export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
});
