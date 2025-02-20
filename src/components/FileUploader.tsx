// import axios from "axios";
// import React, { useContext, useRef, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { create } from "ipfs-http-client";
// import Encryptor from '@/components/Encryptor';
// import { base64ToUint8Array, generateRSAKeyPair } from '@/lib/utils';
// import { useNavigate } from 'react-router-dom';import { DecryptInfoContext } from '@/hooks/decrypt-info';
// import { BACKEND_API, IPFS_API, IPFS_PORT } from '@/constants';
// import { retrieveDecryptedPrivateKey } from '@/lib/localStorageKeyManager';

// const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024; // 10GB in bytes



// const formatBytes = (bytes: number): string => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// };

// const FileUploader: React.FC = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [dragActive, setDragActive] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [uploading, setUploading] = useState<boolean>(false);
//   const [uploadMessage, setUploadMessage] = useState<string | null>(null);
//   const [decryptInfo, decryptInfoSet] = useContext(DecryptInfoContext);
//   const navigate = useNavigate();

//   const ipfs = create({
//     host: IPFS_API,
//     port: IPFS_PORT,
//     protocol: "http"
//   });

//   // Handles file selection for a single file.
//   const handleFiles = async (files: FileList) => {

//     if (files.length === 0) return;

//     const selectedFile = files[0];

//     // const { publicKeyString, privateKeyString } = await generateRSAKeyPair();

//     // Encrypt file
//     const { key }: any = await axios.get(`${BACKEND_API}/users/?email=tigran@gmail.com`);
//     const eres = await Encryptor(selectedFile, key);

//     // Convert Base64 to Uint8Array
//     const encryptedUint8Array = base64ToUint8Array(eres.encryptedFile);

//     // Upload to IPFS
//     const addedFile = await ipfs.add(encryptedUint8Array);

//     const privateKeyString = await retrieveDecryptedPrivateKey();
//     decryptInfoSet({iv: eres.iv, encKey: eres.encryptedAesKey, cid: addedFile.path, privateKey: privateKeyString});

//     // console.log("IPFS CID:", addedFile.path);
//     // console.log("EncKey:", eres.encryptedAesKey);
//     // console.log("iv:", eres.iv);;
//     // console.log("privateKey:", privateKeyString);
    
//     if (selectedFile.size > MAX_FILE_SIZE) {
//       setError('The file exceeds the maximum file size of 10GB.');
//       return;
//     }
//     setError(null);
//     setFile(selectedFile);
//   };

//   // Drag events to update UI state.
//   const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   // Drop event to capture the file.
//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleFiles(e.dataTransfer.files);
//       e.dataTransfer.clearData();
//     }
//   };

//   // Triggers the hidden file input click.
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   // Updates state when a file is selected via the input.
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   // Simulate uploading the file.
//   const handleUpload = async () => {
//     if (!file) return;
//     navigate("/receiver");
//     setUploading(true);
//     setUploadMessage(null);
//     // Simulate a network delay (e.g., 2 seconds)
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     setUploading(false);
//     setUploadMessage('File uploaded successfully!');
//   };

//   return (
//     <Card
//       className={`p-4 border-2 rounded-md transition-colors duration-200 ${dragActive ? 'border-blue-500' : 'border-gray-300'}`}
//       onDragEnter={handleDrag}
//       onDragOver={handleDrag}
//       onDragLeave={handleDrag}
//       onDrop={handleDrop}
//     >
//       <CardContent className="flex flex-col items-center">
//         {/* Hidden file input */}
//         <input
//           type="file"
//           ref={fileInputRef}
//           className="hidden"
//           onChange={handleChange}
//         />
//         <p className="mb-2 text-center">
//           Drag &amp; Drop your file here or click the button to select a file.
//         </p>
//         <Button onClick={handleButtonClick}>Select File</Button>
//         {error && <p className="mt-2 text-red-500">{error}</p>}
//         {file && (
//           <div className="mt-4 w-full text-left">
//             <h4 className="font-semibold mb-2">Selected File:</h4>
//             <p>{file.name} - {formatBytes(file.size)}</p>
//           </div>
//         )}
//         {file && (
//           <div className="mt-4">
//             <Button onClick={handleUpload} disabled={uploading}>
//               {uploading ? 'Uploading...' : 'Next'}
//             </Button>
//           </div>
//         )}
//         {uploadMessage && <p className="mt-2 text-green-600">{uploadMessage}</p>}
//       </CardContent>
//     </Card>
//   );
// };

// export default FileUploader;

import axios from "axios";
import React, { useContext, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { create } from "ipfs-http-client";
import Encryptor from '@/components/Encryptor';
import { base64ToUint8Array, isEmail } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { DecryptInfoContext } from '@/hooks/decrypt-info';
import { BACKEND_API, IPFS_API, IPFS_PORT } from '@/constants';
import { retrieveDecryptedPrivateKey } from '@/lib/localStorageKeyManager';

const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024; // 10GB in bytes

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [decryptInfo, decryptInfoSet] = useContext(DecryptInfoContext);
  const navigate = useNavigate();

  const ipfs = create({
    host: IPFS_API,
    port: IPFS_PORT,
    protocol: "http"
  });

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;
    const selectedFile = files[0];

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('The file exceeds the maximum file size of 10GB.');
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleUpload = async () => {
    if (!file || !recipientEmail) return;

    if (!isEmail(recipientEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Fetch recipient's public key
      console.log('localstroage token: ', localStorage.getItem("token"));
      const { data } = await axios.get(`${BACKEND_API}/users/?email=${recipientEmail}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const user = data;
      if (!user?.key) throw new Error('Recipient not found');
      console.log('recipient: ', user);

      // Encrypt file
      const eres = await Encryptor(file, user.key);
      const encryptedUint8Array = base64ToUint8Array(eres.encryptedFile);

      // Upload to IPFS
      const addedFile = await ipfs.add(encryptedUint8Array);

      const payload = {
        encRandKey: eres.encryptedAesKey,
        hashData: `${addedFile.path} ${eres.iv}`,
        recipientsId: user.id,
      }
      const dambul = await axios.post(`${BACKEND_API}/file`, payload, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });

      console.log('dambul data', dambul.data);
      

      // Get sender's private key
      const privateKeyString = await retrieveDecryptedPrivateKey();
      
      // Update decrypt context
      decryptInfoSet({
        iv: eres.iv,
        encKey: eres.encryptedAesKey,
        cid: addedFile.path,
        privateKey: privateKeyString
      });

      navigate("/receiver");
    } catch (err) {
      setError('Failed to share file. Please check the recipient email and try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card
      className={`p-4 border-2 rounded-md transition-colors duration-200 ${dragActive ? 'border-blue-500' : 'border-gray-300'}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        
        <p className="mb-2 text-center">
          Drag &amp; Drop your file here or click the button to select a file.
        </p>
        
        <Button onClick={() => fileInputRef.current?.click()}>
          Select File
        </Button>

        {error && <p className="text-red-500">{error}</p>}

        {file && (
          <div className="w-full space-y-4">
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="font-semibold mb-2 text-gray-700">Selected File:</h4>
            <p className="text-gray-600">{file.name} - {formatBytes(file.size)}</p>
          </div>

            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter recipient's email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                disabled={uploading}
              />
              
              <Button 
                onClick={handleUpload}
                disabled={uploading || !recipientEmail}
                className="w-full"
              >
                {uploading ? 'Sharing File...' : 'Share File'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploader;