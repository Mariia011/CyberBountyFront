import { algorithm } from "@/constants";
import { base64ToArrayBuffer } from "@/lib/utils";

export const Decryptor = async (
	encryptedFile: string, // Base64-encoded encrypted file
	encryptedAesKey: string, // Base64-encoded encrypted AES key
	iv: string, // Base64-encoded IV
	privateKey: CryptoKey // RSA private key
  ) => {
	try {
	  // Step 1: Decrypt the AES key using the RSA private key
	  const encryptedAesKeyBuffer = base64ToArrayBuffer(encryptedAesKey);
	  const decryptedAesKeyBuffer = await window.crypto.subtle.decrypt(
		{ name: "RSA-OAEP" },
		privateKey,
		encryptedAesKeyBuffer
	  );
  
	  // Import the decrypted AES key
	  const aesKey = await window.crypto.subtle.importKey(
		"raw",
		decryptedAesKeyBuffer,
		{ name: algorithm, length: 256 },
		false,
		["decrypt"]
	  );
  
	  // Step 2: Decrypt the file using the AES key and IV
	  const encryptedFileBuffer = base64ToArrayBuffer(encryptedFile);
	  const ivBuffer = base64ToArrayBuffer(iv);
	  const decryptedFileBuffer = await window.crypto.subtle.decrypt(
		{ name: algorithm, iv: ivBuffer },
		aesKey,
		encryptedFileBuffer
	  );
  
	  // Convert the decrypted file buffer to a Blob
	  return new Blob([decryptedFileBuffer], { type: "application/octet-stream" });
	} catch (error) {
	  console.error("Decryption failed:", error);
	  throw error;
	}
  };