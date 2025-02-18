import React from "react";
import axios from "axios";
import { BACKEND_API, algorithm } from "@/constants";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isEmail = (input: string): boolean => {
  return emailRegex.test(input);
};

export default function FileUpload(props: any) {
  const handleUpload = async (file: File) => {
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

      // Fetch RSA public key from backend
	  const query = isEmail(props.user) ? { email: props.user } : { username: props.user };
      const { data: publicKeyData } = await axios.get(`${BACKEND_API}/?${query}=${props.user}`);
      const publicKeyBuffer = base64ToArrayBuffer(publicKeyData.publicKey);
      
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

      // Send to server
      await axios.post(`${BACKEND_API}/upload`, {
        fileId: file.name,
        encryptedFile: arrayBufferToBase64(encryptedFile),
        encryptedAesKey: arrayBufferToBase64(encryptedAesKey),
        iv: arrayBufferToBase64(iv),
      });

      alert("File uploaded securely!");
    } catch (error) {
      console.error("Encryption failed:", error);
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          handleUpload(e.target.files[0]);
        }
      }}
    />
  );
}

// Helper: Convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

// Helper: Convert Base64 to ArrayBuffer
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};