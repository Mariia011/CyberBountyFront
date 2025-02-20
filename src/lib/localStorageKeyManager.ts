// localStorageKeyManager.ts

import { encryptPrivateKey, decryptPrivateKey } from './cryptoUtils';
import { SALT } from '@/constants';

const STORAGE_KEY = 'encryptedPrivateKey';

/**
 * Encrypts and stores the private key in localStorage.
 * @param privateKey - The private key to be encrypted.
 * @param salt - The password used to encrypt the key.
 */
export async function storeEncryptedPrivateKey(privateKey: string, salt: string = SALT): Promise<void> {
  try {
    const encrypted = await encryptPrivateKey(privateKey, salt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(encrypted));
  } catch (err) {
    console.error('Error encrypting and storing private key:', err);
    throw err;
  }
}

/**
 * Retrieves and decrypts the private key from localStorage.
 * @param password - The password used for decryption.
 * @returns A Promise resolving to the decrypted private key.
 */
export async function retrieveDecryptedPrivateKey(salt: string = SALT): Promise<string> {
  try {
    const encryptedData = localStorage.getItem(STORAGE_KEY);
    if (!encryptedData) {
      throw new Error('No encrypted key found in storage');
    }
    const parsed = JSON.parse(encryptedData);
    return await decryptPrivateKey(parsed, salt);
  } catch (err) {
    console.error('Error retrieving or decrypting private key:', err);
    throw err;
  }
}

/**
 * Clears the stored encrypted private key from localStorage.
 */
export function clearEncryptedPrivateKey(): void {
  localStorage.removeItem(STORAGE_KEY);
}
