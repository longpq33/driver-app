import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface InputProps {
  placeholder: string;
  label?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  [key: string]: any; // Allow additional props
  value?: string;
}

function Input({
  placeholder,
  label = "",
  onChangeText,
  keyboardType,
  autoCapitalize = "none",
  value,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={styles.input} 
        placeholder={placeholder}
        onChangeText={onChangeText} 
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
      />
    </View>
  );
}

export default Input;