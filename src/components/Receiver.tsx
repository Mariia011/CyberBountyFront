import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { create } from 'ipfs-http-client';
import { getIPFSFileBase64 } from '@/lib/utils';
import { BACKEND_API, IPFS_API, IPFS_PORT } from '@/constants';
import axios from 'axios';
import { retrieveDecryptedPrivateKey } from '@/lib/sessionStorageKeyManager';
import Decryptor from "@/components/Decryptor";

const Receiver: React.FC = () => {

  const [fileInfo, setFileInfo] = useState<any>(null);
  const [cid, setCid] = useState('');
  const [encryptedAesKey, setEncryptedAesKey] = useState('');
  const [iv, setIv] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("plain/text");


  const ipfs = create({
    host: IPFS_API,
    port: IPFS_PORT,
    protocol: 'http'
  });


  const handleGetFileInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BACKEND_API}/file/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
    
      const info = response.data[0];
      setFileInfo(info);

    
    
      const [fCid, fIv, fType] = info.hashData.split(" ");
      setCid(fCid);
      setIv(fIv);
      setFileType(fType);
      setEncryptedAesKey(info.encRandKey);
      const pk = await retrieveDecryptedPrivateKey();
      setPrivateKey(pk);
    } catch (err) {
      console.error('Error fetching file info:', err);
      setError('Error fetching file info.');
    } finally {
      setLoading(false);
    }
  };


  const handleDecryptAndDownload = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!cid) {
        setError('CID is missing.');
        return;
      }

    
      const encryptedFile = await getIPFSFileBase64(ipfs, cid);
      const decryptedFile = await Decryptor(encryptedFile, encryptedAesKey, iv, privateKey);
    
    
    
    
      console.log("filetype:", fileType);
      const decryptedBlob = new Blob([decryptedFile], { "type": fileType });

    
      const url = URL.createObjectURL(decryptedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `decrypted-${Date.now()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error during decryption and download:', err);
      setError('Error during decryption and download.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 border-2 rounded-md border-gray-300">
      <CardContent className="flex flex-col gap-4">
        <Button onClick={handleGetFileInfo} disabled={loading}>
          {loading ? 'Fetching file info...' : 'Get File Info'}
        </Button>

        {fileInfo && (
          <p className="text-green-600">
            File info retrieved: {fileInfo.filename || 'File available'}
          </p>
        )}

        <Button
          onClick={handleDecryptAndDownload}
          disabled={loading || !cid || !encryptedAesKey || !iv || !privateKey}
        >
          {loading ? 'Processing...' : 'Decrypt and Download'}
        </Button>

        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default Receiver;
