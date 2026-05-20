import {
  getCurrentUser,
  login as authLogin,
  logout as authLogout,
  signupCompany,
  signupUser,
} from "@/database/sqlite/auth";
import { getDatabase } from "@/database/sqlite/db";
import type { AccountType, SessionUser } from "@/types/user.types";
import type { CompanySignupData, UserSignupData } from "@/types/signup.types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AuthContextValue {
  user: SessionUser | null;
  isReady: boolean;
  login: (
    email: string,
    password: string,
    accountType: AccountType,
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  signupUser: (data: UserSignupData) => Promise<void>;
  signupCompany: (data: CompanySignupData) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  const refreshUser = useCallback(async () => {
    const current = await getCurrentUser();
    setUser(current);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await getDatabase();
        if (mounted) {
          await refreshUser();
        }
      } finally {
        if (mounted) setIsReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [refreshUser]);

  const login = useCallback(
    async (email: string, password: string, accountType: AccountType) => {
      const sessionUser = await authLogin(email, password, accountType);
      setUser(sessionUser);
    },
    [],
  );

  const logout = useCallback(async () => {
    await authLogout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isReady,
      login,
      logout,
      refreshUser,
      signupUser,
      signupCompany,
    }),
    [user, isReady, login, logout, refreshUser],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }
  return ctx;
}
