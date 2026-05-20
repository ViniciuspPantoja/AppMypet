import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "@mypet/session_user_id";

export async function getSessionUserId(): Promise<string | null> {
  return AsyncStorage.getItem(SESSION_KEY);
}

export async function setSessionUserId(userId: string): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, userId);
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
