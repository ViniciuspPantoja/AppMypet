/**
 * Validadores para cadastros
 */

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida força da senha
 * Requisitos: mínimo 6 caracteres
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Valida data de nascimento
 * Retorna objeto com validação e erro (se houver)
 */
export function validateBirthDate(birthDate: string): {
  isValid: boolean;
  error?: string;
} {
  if (!birthDate) {
    return { isValid: false, error: "Data de nascimento é obrigatória" };
  }

  // Tenta parsear a data (espera formato YYYY-MM-DD ou DD/MM/YYYY)
  let date: Date;

  if (birthDate.includes("/")) {
    const [day, month, year] = birthDate.split("/");
    date = new Date(`${year}-${month}-${day}`);
  } else {
    date = new Date(birthDate);
  }

  if (isNaN(date.getTime())) {
    return { isValid: false, error: "Data inválida" };
  }

  // Calcula idade
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  // Verifica idade mínima (18 anos)
  if (age < 18) {
    return { isValid: false, error: "Você deve ter mais de 18 anos" };
  }

  return { isValid: true };
}

/**
 * Valida CNPJ
 * Remove formatação e valida algoritmo
 */
export function isValidCNPJ(cnpj: string): boolean {
  // Remove formatação
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");

  if (cleanCNPJ.length !== 14) {
    return false;
  }

  // Verifica se não é uma sequência repetida
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let size = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, size);
  let digits = cleanCNPJ.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  // Validação do segundo dígito verificador
  size = size + 1;
  numbers = cleanCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }

  return true;
}

/**
 * Formata CNPJ com máscara: XX.XXX.XXX/XXXX-XX
 */
export function formatCNPJ(cnpj: string): string {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");
  if (cleanCNPJ.length !== 14) return cnpj;

  return cleanCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5",
  );
}

/**
 * Formata data para DD/MM/YYYY
 */
export function formatDate(date: string): string {
  const cleanDate = date.replace(/[^\d]/g, "");

  if (cleanDate.length <= 2) return cleanDate;
  if (cleanDate.length <= 4)
    return `${cleanDate.slice(0, 2)}/${cleanDate.slice(2)}`;
  return `${cleanDate.slice(0, 2)}/${cleanDate.slice(2, 4)}/${cleanDate.slice(4, 8)}`;
}

/**
 * Valida campos comuns entre os dois fluxos
 */
export function validateCommonFields(
  email: string,
  password: string,
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!email) {
    errors.push("Email é obrigatório");
  } else if (!isValidEmail(email)) {
    errors.push("Email inválido");
  }

  if (!password) {
    errors.push("Senha é obrigatória");
  } else if (!isValidPassword(password)) {
    errors.push("Senha deve ter no mínimo 6 caracteres");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
