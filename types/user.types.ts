export type AccountType = "user" | "company";

export interface SessionUser {
  id: string;
  email: string;
  accountType: AccountType;
  displayName?: string;
  birthDate?: string;
  photoUrl?: string;
  cnpj?: string;
  businessName?: string;
  businessSegment?: string;
  createdAt: string;
}
