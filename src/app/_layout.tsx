
import { PlacesProvider } from "@/lib/places-context";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Tabs } from "expo-router/js-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PlacesProvider>
        <AnimatedSplashOverlay />

        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "rgb(83, 81, 89)",
            headerTintColor: "rgb(83, 81, 89)",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Places",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />

          <Tabs.Screen
            name="add"
            options={{
              title: "Add",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" color={color} size={size} />
              ),
            }}
          />

          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="compass" color={color} size={size} />
              ),
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}
          />

          <Tabs.Screen
            name="place/[id]"
            options={{
              href: null,
              title: "Place",
            }}
          />
        </Tabs>
      </PlacesProvider>
    </ThemeProvider>
  );
}
