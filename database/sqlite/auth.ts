import type { AccountType, SessionUser } from "@/types/user.types";
import type { CompanySignupData, UserSignupData } from "@/types/signup.types";

import { verifyPassword } from "./password";
import {
  clearSession,
  getSessionUserId,
  setSessionUserId,
} from "./session";
import {
  createCompanyAccount,
  createUserAccount,
  findUserByEmail,
  findUserById,
} from "./users";

export async function login(
  email: string,
  password: string,
  expectedAccountType: AccountType,
): Promise<SessionUser> {
  const record = await findUserByEmail(email);
  if (!record) {
    throw new Error("E-mail ou senha incorretos.");
  }

  const valid = await verifyPassword(password, record.passwordHash);
  if (!valid) {
    throw new Error("E-mail ou senha incorretos.");
  }

  if (record.accountType !== expectedAccountType) {
    const label = expectedAccountType === "user" ? "usuário" : "empresa";
    throw new Error(`Esta conta não é do tipo ${label}.`);
  }

  await setSessionUserId(record.id);
  const { passwordHash: _, ...user } = record;
  return user;
}

export async function logout(): Promise<void> {
  await clearSession();
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return findUserById(userId);
}

export async function signupUser(data: UserSignupData): Promise<void> {
  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new Error("Este e-mail já está cadastrado.");
  }
  await createUserAccount(data);
}

export async function signupCompany(data: CompanySignupData): Promise<void> {
  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new Error("Este e-mail já está cadastrado.");
  }
  await createCompanyAccount(data);
}
