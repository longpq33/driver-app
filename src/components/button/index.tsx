import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './styles';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
}

function Button({
  title = 'Button',
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        (disabled || loading) && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
