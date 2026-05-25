import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_SESSION_KEY = "@mypetmobile/auth-session";
const AUTH_SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export interface StoredAuthSession {
  signedInAt: number;
  expiresAt: number;
}

export function createAuthSession(): StoredAuthSession {
  const signedInAt = Date.now();

  return {
    signedInAt,
    expiresAt: signedInAt + AUTH_SESSION_TTL_MS,
  };
}

export async function saveAuthSession(): Promise<StoredAuthSession> {
  const session = createAuthSession();

  await AsyncStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));

  return session;
}

export async function readAuthSession(): Promise<StoredAuthSession | null> {
  const rawSession = await AsyncStorage.getItem(AUTH_SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(rawSession) as StoredAuthSession;

    if (
      typeof parsedSession.signedInAt !== "number" ||
      typeof parsedSession.expiresAt !== "number"
    ) {
      return null;
    }

    return parsedSession;
  } catch {
    return null;
  }
}

export async function clearAuthSession(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_SESSION_KEY);
}

export function isAuthSessionExpired(
  session: StoredAuthSession | null,
): boolean {
  if (!session) {
    return true;
  }

  return session.expiresAt <= Date.now();
}
