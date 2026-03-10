import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";

const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={HomeScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default MainNavigation;