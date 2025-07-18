import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils'; // импортируем утилиту

/**
 * Функция хеширования пароля.
 * @param password - строка пароля
 * @returns hex-строка SHA-256
 */
export function hashPassword(password: string): string {
  const bytes = new TextEncoder().encode(password);
  const hash = sha256(bytes); // Uint8Array
  return bytesToHex(hash);    // превращаем в hex
}
