import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface InputProps {
  placeholder: string;
  label?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
  value?: string;
  error?: string;
  maxLength?: number;
}

function Input({
  placeholder,
  label = "",
  onChangeText,
  onBlur,
  keyboardType,
  autoCapitalize = "none",
  secureTextEntry = false,
  value,
  error,
  maxLength,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        value={value}
        placeholderTextColor="#999"
        maxLength={maxLength}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export default Input;
