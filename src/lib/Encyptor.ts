// import crypto from "crypto";
// import { Buffer } from "buffer";

// class Encryptor {
// 	private key: Buffer; // Your main key for encrypting randKey
// 	private file: File;
// 	private randKey: Buffer;
// 	private algorithm: string;

// 	constructor(publicKey: string, file: File, algorithm: string = "aes-256-cbc") {
// 		this.key = Buffer.from(publicKey, "utf-8");
// 		this.file = file;
// 		this.algorithm = algorithm;
// 		this.randKey = crypto.randomBytes(32); // Generate a 256-bit random key
// 	}

// 	// Encrypt file with randKey
// 	public async encrypt() {
// 		const fileContent = await this.readFile();
// 	}

// 	private readFile(): Promise<Buffer> {
// 		return new Promise((resolve, reject) => {
// 			const reader = new FileReader();
// 			reader.onload = () => resolve(Buffer.from(reader.result as ArrayBuffer));
// 			reader.onerror = (error) => reject(error);
// 			reader.readAsArrayBuffer(this.file);
// 		});
// 	}
// }

// export default Encryptor;
