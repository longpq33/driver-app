import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#999',
    opacity: 0.7,
  },
});
