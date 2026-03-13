import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect, useRef } from "react";
import { CommonActions } from "@react-navigation/native";
import MainNavigation from "./main-navigation";
import AuthNavigation from "./auth-navigation";
import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/hooks/useAuth";
import SplashScreen from "@/screens/splash";

const Stack = createNativeStackNavigator();

function Navigation() {
  const navigationRef = useRef<any>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Determine target screen after splash
    const accessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
    const targetScreen = accessToken ? 'Main' : 'Auth';

    // Hide splash and navigate to target
    const timer = setTimeout(() => {
      setShowSplash(false);
      if (navigationRef.current) {
        navigationRef.current.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: targetScreen }],
          })
        );
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => {}} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthNavigation} />
        <Stack.Screen name="Main" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;