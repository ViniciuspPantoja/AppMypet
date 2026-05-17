import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    // Defer navigation to the next frame so the navigator mounts first
    const raf = requestAnimationFrame(() => router.replace("/login"));
    return () => cancelAnimationFrame(raf);
  }, [router]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup-type" />
        <Stack.Screen name="signup-user" />
        <Stack.Screen name="signup-company" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="petmap" />
        <Stack.Screen name="my-pet" />
        <Stack.Screen name="plans" />
        <Stack.Screen name="partners" />
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
