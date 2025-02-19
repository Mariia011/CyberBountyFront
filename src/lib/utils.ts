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



// export async function getIPFSFileBase64(ipfs: any, cid: string): Promise<string> {
//   const result = await ipfs.get(cid);
//   // Check if result is an array; if not, wrap it in one.
//   const files = Array.isArray(result) ? result : [result];

//   // We'll just use the first file that has content.
//   let fileObj = files.find((f) => f.content);
//   if (!fileObj) {
//     throw new Error(`No file content found for CID: ${cid}`);
//   }

//   const chunks: Uint8Array[] = [];
//   // fileObj.content is expected to be an async iterable
//   for await (const chunk of fileObj.content) {
//     chunks.push(chunk);
//   }

//   // Combine chunks into a single Uint8Array
//   const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
//   const combined = new Uint8Array(totalLength);
//   let offset = 0;
//   for (const chunk of chunks) {
//     combined.set(chunk, offset);
//     offset += chunk.length;
//   }

//   // Return the Base64-encoded string of the combined data.
//   return arrayBufferToBase64(combined.buffer);
// }