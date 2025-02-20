import React, { useContext, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { create } from "ipfs-http-client";
import Encryptor from '@/components/Encryptor';
import { base64ToUint8Array, generateRSAKeyPair } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';import { DecryptInfoContext } from '@/hooks/decrypt-info';
import { IPFS_API, IPFS_PORT } from '@/constants';
;

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
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [decryptInfo, decryptInfoSet] = useContext(DecryptInfoContext);
  const navigate = useNavigate();

  const ipfs = create({
    host: IPFS_API,
    port: IPFS_PORT,
    protocol: "http"
  });

  // Handles file selection for a single file.
  const handleFiles = async (files: FileList) => {

    if (files.length === 0) return;

    const selectedFile = files[0];

    const { publicKeyString, privateKeyString } = await generateRSAKeyPair();

    // Encrypt file
    const eres = await Encryptor(selectedFile, publicKeyString);

    // Convert Base64 to Uint8Array
    const encryptedUint8Array = base64ToUint8Array(eres.encryptedFile);

    // Upload to IPFS
    const addedFile = await ipfs.add(encryptedUint8Array);
    decryptInfoSet({iv: eres.iv, encKey: eres.encryptedAesKey, cid: addedFile.path, privateKey: privateKeyString});

    // console.log("IPFS CID:", addedFile.path);
    // console.log("EncKey:", eres.encryptedAesKey);
    // console.log("iv:", eres.iv);;
    // console.log("privateKey:", privateKeyString);
    

    // Retrieve file from IPFS
    // const getFile = await getIPFSFileBase64(ipfs, addedFile.path);
    // console.log("Retrieved Encrypted File (Base64):", getFile);

    // Decrypt file
    // const dres = await Decryptor(getFile, eres.encryptedAesKey, eres.iv, privateKeyString);
    // console.log("Decrypted file:", await dres.text());
    // console.log(await dres.text());
    // const fileData = await selectedFile.text();
    // console.log(fileData);
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('The file exceeds the maximum file size of 10GB.');
      return;
    }
    setError(null);
    setFile(selectedFile);
  };

  // Drag events to update UI state.
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Drop event to capture the file.
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  // Triggers the hidden file input click.
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Updates state when a file is selected via the input.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // Simulate uploading the file.
  const handleUpload = async () => {
    if (!file) return;
    navigate("/receiver");
    setUploading(true);
    setUploadMessage(null);
    // Simulate a network delay (e.g., 2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUploading(false);
    setUploadMessage('File uploaded successfully!');
  };

  return (
    <Card
      className={`p-4 border-2 rounded-md transition-colors duration-200 ${dragActive ? 'border-blue-500' : 'border-gray-300'}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleChange}
        />
        <p className="mb-2 text-center">
          Drag &amp; Drop your file here or click the button to select a file.
        </p>
        <Button onClick={handleButtonClick}>Select File</Button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {file && (
          <div className="mt-4 w-full text-left">
            <h4 className="font-semibold mb-2">Selected File:</h4>
            <p>{file.name} - {formatBytes(file.size)}</p>
          </div>
        )}
        {file && (
          <div className="mt-4">
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Next'}
            </Button>
          </div>
        )}
        {uploadMessage && <p className="mt-2 text-green-600">{uploadMessage}</p>}
      </CardContent>
    </Card>
  );
};

export default FileUploader;
