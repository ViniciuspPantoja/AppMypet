import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AppLoadingScreen from "./loading";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <AppLoadingScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(auth)">
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="petmap" />
        <Stack.Screen name="my-pet" />
        <Stack.Screen name="pet-details/[petId]" />
        <Stack.Screen name="pet-register" />
        <Stack.Screen name="plans" />
        <Stack.Screen name="partners" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="appointment" />
        <Stack.Screen name="vaccines" />
        <Stack.Screen name="nearby" />
        <Stack.Screen name="pet-shop" />
        <Stack.Screen name="notifications" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
