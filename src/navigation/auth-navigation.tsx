import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SiginScreen from "../screens/auth/sigin";
import ResgisterScreen from "../screens/auth/register";
import ForgotPasswordScreen from "../screens/auth/forgot-password";

const Stack = createNativeStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" options={{ title: 'Sign In', headerShown: false }}>
        {(_props) => (
          <SiginScreen />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register" options={{ title: 'Sign Up', headerShown: false }}>
        {(_props) => (
          <ResgisterScreen />
        )}
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword" options={{ title: 'Forgot Password', headerShown: false }}>
        {(_props) => (
          <ForgotPasswordScreen />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthNavigation;