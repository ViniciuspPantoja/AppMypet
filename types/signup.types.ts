/**
 * Tipos e interfaces para o sistema de cadastro
 */

export type SignupType = "user" | "company";

/**
 * Dados do cadastro de Usuário
 */
export interface UserSignupData {
  displayName: string;
  email: string;
  birthDate: string; // DD/MM/YYYY
  password: string;
}

/**
 * Dados do cadastro de Empresa
 */
export interface CompanySignupData {
  email: string;
  cnpj: string;
  password: string;
  businessName: string; // Nome fantasia
  businessSegment: string; // Ramo de atuação
  address: string;
  isPartner: boolean;
}

/**
 * Resposta da validação
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Estado do formulário
 */
export interface FormState {
  data: UserSignupData | CompanySignupData;
  errors: Record<string, string>;
  isSubmitting: boolean;
}
