import * as Crypto from "expo-crypto";

export async function hashPassword(password: string): Promise<string> {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `mypet:${password}`,
  );
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === passwordHash;
}
