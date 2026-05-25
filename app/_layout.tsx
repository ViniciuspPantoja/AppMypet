import { auth } from "@/database/firebase/firebase";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useColorScheme } from "react-native";
import AppLoadingScreen from "./loading";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(true);
  const hasForcedInitialLoginRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (hasForcedInitialLoginRef.current) {
      return;
    }

    hasForcedInitialLoginRef.current = true;

    const inAuthGroup = segments[0] === "(auth)";

    if (!inAuthGroup) {
      router.replace("/login");
    }
  }, [loading, router, segments]);

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
