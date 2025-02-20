// cryptoUtils.ts

/**
 * Derives a cryptographic key from a password using PBKDF2.
 * @param password - The password to derive the key from.
 * @param salt - A random salt value.
 * @returns A Promise resolving to the derived CryptoKey.
 */
export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
	const encoder = new TextEncoder();
	const keyMaterial = await window.crypto.subtle.importKey(
	  'raw',
	  encoder.encode(password),
	  { name: 'PBKDF2' },
	  false,
	  ['deriveKey']
	);
  
	return window.crypto.subtle.deriveKey(
	  {
		name: 'PBKDF2',
		salt,
		iterations: 100000,
		hash: 'SHA-256'
	  },
	  keyMaterial,
	  { name: 'AES-GCM', length: 256 },
	  false,
	  ['encrypt', 'decrypt']
	);
  }
  
  /**
   * Encrypts the given private key string using AES-GCM.
   * @param privateKey - The private key string to encrypt.
   * @param password - The password used for key derivation.
   * @returns A Promise resolving to an object containing the salt, IV, and ciphertext.
   */
  export async function encryptPrivateKey(privateKey: string, password: string): Promise<{
	salt: number[];
	iv: number[];
	ciphertext: number[];
  }> {
	const encoder = new TextEncoder();
	// Generate a random salt and initialization vector (IV)
	const salt = window.crypto.getRandomValues(new Uint8Array(16));
	const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
	const key = await deriveKey(password, salt);
  
	const encryptedBuffer = await window.crypto.subtle.encrypt(
	  { name: 'AES-GCM', iv },
	  key,
	  encoder.encode(privateKey)
	);
  
	return {
	  salt: Array.from(salt),
	  iv: Array.from(iv),
	  ciphertext: Array.from(new Uint8Array(encryptedBuffer))
	};
  }
  
  /**
   * Decrypts the previously encrypted private key.
   * @param encryptedData - The object containing salt, IV, and ciphertext.
   * @param password - The password used for key derivation.
   * @returns A Promise resolving to the decrypted private key string.
   */
  export async function decryptPrivateKey(
	encryptedData: { salt: number[]; iv: number[]; ciphertext: number[] },
	password: string
  ): Promise<string> {
	const { salt, iv, ciphertext } = encryptedData;
	const key = await deriveKey(password, new Uint8Array(salt));
  
	const decryptedBuffer = await window.crypto.subtle.decrypt(
	  { name: 'AES-GCM', iv: new Uint8Array(iv) },
	  key,
	  new Uint8Array(ciphertext)
	);
  
	const decoder = new TextDecoder();
	return decoder.decode(decryptedBuffer);
  }
  