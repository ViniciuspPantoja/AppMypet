import type { AccountType, SessionUser } from "@/types/user.types";
import type { CompanySignupData, UserSignupData } from "@/types/signup.types";

import { getDatabase } from "./db";
import { generateId } from "./id";
import { hashPassword } from "./password";

type UserRow = {
  id: string;
  email: string;
  password_hash: string;
  account_type: AccountType;
  display_name: string | null;
  birth_date: string | null;
  photo_url: string | null;
  cnpj: string | null;
  business_name: string | null;
  business_segment: string | null;
  created_at: string;
};

function mapRow(row: UserRow): SessionUser {
  return {
    id: row.id,
    email: row.email,
    accountType: row.account_type,
    displayName: row.display_name ?? undefined,
    birthDate: row.birth_date ?? undefined,
    photoUrl: row.photo_url ?? undefined,
    cnpj: row.cnpj ?? undefined,
    businessName: row.business_name ?? undefined,
    businessSegment: row.business_segment ?? undefined,
    createdAt: row.created_at,
  };
}

export async function findUserById(id: string): Promise<SessionUser | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<UserRow>(
    "SELECT * FROM users WHERE id = ?",
    [id],
  );
  return row ? mapRow(row) : null;
}

export async function findUserByEmail(
  email: string,
): Promise<(SessionUser & { passwordHash: string }) | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<UserRow>(
    "SELECT * FROM users WHERE email = ? COLLATE NOCASE",
    [email.trim()],
  );
  if (!row) return null;
  return { ...mapRow(row), passwordHash: row.password_hash };
}

export async function createUserAccount(
  data: UserSignupData,
): Promise<SessionUser> {
  const db = await getDatabase();
  const id = generateId();
  const createdAt = new Date().toISOString();
  const passwordHash = await hashPassword(data.password);

  await db.runAsync(
    `INSERT INTO users (id, email, password_hash, account_type, display_name, birth_date, created_at)
     VALUES (?, ?, ?, 'user', ?, ?, ?)`,
    [
      id,
      data.email.trim(),
      passwordHash,
      "Usuário",
      data.birthDate,
      createdAt,
    ],
  );

  const user = await findUserById(id);
  if (!user) throw new Error("Falha ao criar utilizador.");
  return user;
}

export async function createCompanyAccount(
  data: CompanySignupData,
): Promise<SessionUser> {
  const db = await getDatabase();
  const id = generateId();
  const createdAt = new Date().toISOString();
  const passwordHash = await hashPassword(data.password);

  await db.runAsync(
    `INSERT INTO users (
      id, email, password_hash, account_type, display_name,
      cnpj, business_name, business_segment, created_at
    ) VALUES (?, ?, ?, 'company', ?, ?, ?, ?, ?)`,
    [
      id,
      data.email.trim(),
      passwordHash,
      data.businessName,
      data.cnpj.replace(/[^\d]/g, ""),
      data.businessName,
      data.businessSegment,
      createdAt,
    ],
  );

  const user = await findUserById(id);
  if (!user) throw new Error("Falha ao criar empresa.");
  return user;
}

export async function updateUserProfile(
  userId: string,
  data: { displayName?: string; birthDate?: string; email?: string; photoUrl?: string },
): Promise<SessionUser> {
  const db = await getDatabase();
  const current = await findUserById(userId);
  if (!current) throw new Error("Utilizador não encontrado.");

  const displayName = data.displayName ?? current.displayName ?? "Usuário";
  const birthDate = data.birthDate ?? current.birthDate ?? null;
  const email = data.email?.trim() ?? current.email;
  const photoUrl = data.photoUrl ?? current.photoUrl ?? null;

  if (email !== current.email) {
    const existing = await db.getFirstAsync<{ id: string }>(
      "SELECT id FROM users WHERE email = ? COLLATE NOCASE AND id != ?",
      [email, userId],
    );
    if (existing) {
      throw new Error("Este e-mail já está em uso.");
    }
  }

  await db.runAsync(
    `UPDATE users SET display_name = ?, birth_date = ?, email = ?, photo_url = ? WHERE id = ?`,
    [displayName, birthDate, email, photoUrl, userId],
  );

  const updated = await findUserById(userId);
  if (!updated) throw new Error("Falha ao atualizar perfil.");
  return updated;
}
