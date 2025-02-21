import { algorithm } from "@/constants";
import { base64ToArrayBuffer, arrayBufferToBase64 } from "@/lib/utils";

// const Encryptor = async (file: File, user: string) => {
//   try {
//     // Generate AES key
//     const aesKey = await window.crypto.subtle.generateKey(
//       { name: algorithm, length: 256 },
//       true,
//       ["encrypt", "decrypt"]
//     );

//     // Encrypt file with AES
//     const iv = window.crypto.getRandomValues(new Uint8Array(12));
//     const encryptedFile = await window.crypto.subtle.encrypt(
//       { name: algorithm, iv },
//       aesKey,
//       await file.arrayBuffer()
//     );

//     // Fetch RSA public key from backend
//     const query = isEmail(user) ? { email: user } : { username: user };
//     const { data: publicKeyData } = await axios.get(`${BACKEND_API}/?${query}=${user}`);
//     const publicKeyBuffer = base64ToArrayBuffer(publicKeyData.publicKey);

//     const publicKey = await window.crypto.subtle.importKey(
//       "spki",
//       publicKeyBuffer,
//       { name: "RSA-OAEP", hash: "SHA-256" },
//       false,
//       ["encrypt"]
//     );

//     // Encrypt AES key with RSA public key
//     const exportedAesKey = await window.crypto.subtle.exportKey("raw", aesKey);
//     const encryptedAesKey = await window.crypto.subtle.encrypt(
//       { name: "RSA-OAEP" },
//       publicKey,
//       exportedAesKey
//     );

//     // Return encrypted data
//     return {
//       fileId: file.name,
//       encryptedFile: arrayBufferToBase64(encryptedFile),
//       encryptedAesKey: arrayBufferToBase64(encryptedAesKey),
//       iv: arrayBufferToBase64(iv),
//     };
//   } catch (error) {
//     console.error("Encryption failed:", error);
//     throw error;
//   }
// };

    // Fetch RSA public key from backend
    // const query = isEmail(user) ? { email: user } : { username: user };
    // const { data: publicKeyData } = await axios.get(`${BACKEND_API}/?${query}=${user}`);

// -------------------- for testing the algorithm -------------------------------

const Encryptor = async (file: File, publicKeyBase: string) => {
  try {
    // Generate AES key
    const aesKey = await window.crypto.subtle.generateKey(
      { name: algorithm, length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    // Encrypt file with AES
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedFile = await window.crypto.subtle.encrypt(
      { name: algorithm, iv },
      aesKey,
      await file.arrayBuffer()
    );

    // Convert base64 public key to ArrayBuffer
    const publicKeyBuffer = base64ToArrayBuffer(publicKeyBase);

    // Import RSA public key
    const publicKey = await window.crypto.subtle.importKey(
      "spki",
      publicKeyBuffer,
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["encrypt"]
    );

    // Encrypt AES key with RSA public key
    const exportedAesKey = await window.crypto.subtle.exportKey("raw", aesKey);
    const encryptedAesKey = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      publicKey,
      exportedAesKey
    );

    // Return encrypted data
    return {
      filename: file.name,
      filetype: file.type,
      encryptedFile: arrayBufferToBase64(encryptedFile),
      encryptedAesKey: arrayBufferToBase64(encryptedAesKey),
      iv: arrayBufferToBase64(iv),
    };
  } catch (error) {
    console.error("Encryption failed:", error);
    throw error;
  }
};

export default Encryptor;