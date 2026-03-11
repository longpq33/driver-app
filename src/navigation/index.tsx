import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigation from "./main-navigation";
import AuthNavigation from "./auth-navigation";
import { STORAGE_KEYS } from "../config/constants";
import { storage } from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

function Navigation() {
  const accessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={accessToken ? 'Main' : 'Auth'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthNavigation} />
        <Stack.Screen name="Main" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;