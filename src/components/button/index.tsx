import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface ButtonProps {
  onPress: () => void;
  name?: string;
}

function Button({
  name = "Button",
  onPress
}: ButtonProps) {
  return(
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Button;