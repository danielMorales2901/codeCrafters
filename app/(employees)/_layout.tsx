import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="explore" 
        options={{
          title: "Día",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "General",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
