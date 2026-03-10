import { Text, View } from "react-native";
import { styles } from "./styles";
import Button from "../../../components/button";
import Input from "../../../components/input";

function ForgotPasswordScreen() {
  const handleClick = () => {
    // Handle password reset logic here
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Input 
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button name="Reset Password" onPress={handleClick} />
    </View>
  );
}

export default ForgotPasswordScreen;