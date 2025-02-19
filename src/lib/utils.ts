import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000; // 32768 bytes per chunk
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}


export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

export const isEmail = (input: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
};

export async function getIPFSFileBase64(ipfs: any, cid: string): Promise<string> {
    const getFile = ipfs.cat(cid);
    let receivedData = new Uint8Array();
    for await (const chunk of getFile) {
      receivedData = new Uint8Array([...receivedData, ...chunk]);
    }

    // Convert received data to Base64
    const receivedBase64 = uint8ArrayToBase64(receivedData);
    return receivedBase64;
}

export const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  let binary = '';
  uint8Array.forEach(byte => (binary += String.fromCharCode(byte)));
  return btoa(binary);
};


export const generateRSAKeyPair = async (): Promise<{
  keyPair: CryptoKeyPair;
  publicKeyString: string;
  privateKeyString: string;
}> => {
  // Generate RSA key pair
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), // 65537
      hash: "SHA-256",
    },
    true, // Extractable
    ["encrypt", "decrypt"] // Key usages
  );

  // Export public key as base64 string
  const publicKeyBuffer = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey
  );
  const publicKeyString = arrayBufferToBase64(publicKeyBuffer);

  // Export private key as base64 string
  const privateKeyBuffer = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );
  const privateKeyString = arrayBufferToBase64(privateKeyBuffer);

  return {
    keyPair,
    publicKeyString,
    privateKeyString
  };
};