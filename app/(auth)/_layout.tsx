import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="signup-type" />
      <Stack.Screen name="signup-user" />
      <Stack.Screen name="signup-company" />
    </Stack>
  );
}
