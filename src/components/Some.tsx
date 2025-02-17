// import React from 'react';
// import axios from 'axios';
// import { BACKEND_API } from '@/constants';

// export default function FileUpload() {
//   const handleUpload = async (file: File) => {
//     try {
//       // Generate AES key
//       const aesKey = await window.crypto.subtle.generateKey(
//         { name: "AES-GCM", length: 256 },
//         true,
//         ["encrypt", "decrypt"]
//       );

//       // Encrypt file with AES
//       const iv = window.crypto.getRandomValues(new Uint8Array(12));
//       const encryptedFile = await window.crypto.subtle.encrypt(
//         { name: "AES-GCM", iv },
//         aesKey,
//         await file.arrayBuffer()
//       );


//       const { publicKey } = await axios.get(`${BACKEND_API}`/)

//       // Encrypt AES key with RSA public key
//       const encryptedAesKey = await window.crypto.subtle.encrypt(
//         { name: "RSA-OAEP" },
//         publicKey,
//         await window.crypto.subtle.exportKey("raw", aesKey)
//       );

//       // Send to server
//       await axios.post('http://localhost:3001/upload', {
//         fileId: 'demo-file',
//         encryptedFile: arrayBufferToBase64(encryptedFile),
//         encryptedAesKey: arrayBufferToBase64(encryptedAesKey),
//         iv: arrayBufferToBase64(iv)
//       });

//       alert('File uploaded securely!');
//     } catch (error) {
//       console.error('Encryption failed:', error);
//     }
//   };

//   return (
//     <input
//       type="file"
//       onChange={(e) => handleUpload(e.target.files[0])}
//     />
//   );
// }

// // Helper: Convert ArrayBuffer to Base64
// const arrayBufferToBase64 = (buffer) => {
//   return btoa(String.fromCharCode(...new Uint8Array(buffer)));
// };
