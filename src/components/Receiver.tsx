import React, {useContext, useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {create} from 'ipfs-http-client';
import Decryptor from './Decryptor';
import {getIPFSFileBase64} from '@/lib/utils';
import {DecryptInfoContext} from '@/hooks/decrypt-info';
import {BACKEND_API, IPFS_API, IPFS_PORT} from '@/constants';
import axios from "axios";

const Receiver: React.FC = () => {

  const [cid, setCid] = useState('');
  const [encryptedAesKey, setEncryptedAesKey] = useState('');
  const [iv, setIv] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [decryptedFile, setDecryptedFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decryptInfo, setDecryptInfo] = useContext(DecryptInfoContext);

  async function foo() {
    // console.log('token ', sessionStorage.getItem("token"));
    const res = await axios.get(`${BACKEND_API}/file`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    });

    console.log({ res });

    const fileInfo = res.data[0];

    const tmp = {
      cid: fileInfo?.hashData,
      iv: fileInfo?.encRandKey?.split(' ')[1],
      encKey: fileInfo?.encRandKey,
      privateKey: decryptInfo?.privateKey,
    }

    return tmp;
  }

  useEffect(() => {
    async function fetchDecryptInfo() {
      const tmp = await foo();
      setDecryptInfo(tmp);
      console.log({tmp})
    }
    fetchDecryptInfo();
  }, []);


  useEffect(() => {
    if (decryptInfo) {
      setIv(decryptInfo.iv || '');
      setCid(decryptInfo.cid || '');
      setEncryptedAesKey(decryptInfo.encKey || '');
      setPrivateKey(decryptInfo.privateKey || '');
    }
  }, [decryptInfo]);

  const ipfs = create({
    host: IPFS_API,
    port: IPFS_PORT,
    protocol: "http"
  });

  const handleDecrypt = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get encrypted file from IPFS
      const encryptedFile = await getIPFSFileBase64(ipfs, cid);

      // Decrypt the file
      const decryptedBlob = await Decryptor(encryptedFile, encryptedAesKey, iv, privateKey);

      setDecryptedFile(decryptedBlob);
    } catch (err) {
      console.error('Decryption failed:', err);
      setError('Failed to decrypt file. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!decryptedFile) return;

    const url = URL.createObjectURL(decryptedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decrypted-${Date.now()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-4 border-2 rounded-md border-gray-300">
      <CardContent className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="cid">IPFS CID</Label>
          <Input
            id="cid"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            placeholder="Enter IPFS Content ID (CID)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="encryptedAesKey">Encrypted AES Key (Base64)</Label>
          <Input
            id="encryptedAesKey"
            value={encryptedAesKey}
            onChange={(e) => setEncryptedAesKey(e.target.value)}
            placeholder="Enter encrypted AES key"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="iv">Initialization Vector (IV)</Label>
          <Input
            id="iv"
            value={iv}
            onChange={(e) => setIv(e.target.value)}
            placeholder="Enter initialization vector"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="privateKey">Private Key (Base64)</Label>
          <Input
            id="privateKey"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter your private key"
            type="password"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button
          onClick={handleDecrypt}
          disabled={loading || !cid || !encryptedAesKey || !iv || !privateKey}
        >
          {loading ? 'Decrypting...' : 'Decrypt File'}
        </Button>

        {decryptedFile && (
          <div className="mt-4">
            <p className="text-green-600 mb-2">File decrypted successfully!</p>
            <Button variant="outline" onClick={handleDownload}>
              Download Decrypted File
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Receiver;
