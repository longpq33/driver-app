import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SiginScreen from "@/screens/auth/sigin";
import ResgisterScreen from "@/screens/auth/register";
import ForgotPasswordScreen from "@/screens/auth/forgot-password";
import OtpInputScreen from "@/screens/auth/otp-input";
import TermsScreen from "@/screens/auth/terms";

export type AuthStackParamList = {
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OtpInput: {
    phone: string;
    type: 'login' | 'register';
    name?: string;
    email?: string;
  };
  Terms: {
    phone: string;
    name: string;
    email?: string;
    firebaseToken: string;
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

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
      <Stack.Screen name="OtpInput" options={{ title: 'Verify OTP', headerShown: false }}>
        {(_props) => (
          <OtpInputScreen />
        )}
      </Stack.Screen>
      <Stack.Screen name="Terms" options={{ title: 'Terms & Privacy', headerShown: false }}>
        {(_props) => (
          <TermsScreen />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthNavigation;
