import crypto from 'crypto';

export default function decryptContent(encryptedContent: string): string{
  const algorithm = "aes-256-cbc";
  const [ivHex, encryptedHex] = encryptedContent.split(":");

  // Convert IV and encrypted data from hexadecimal to Buffer
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  // Convert the key from hexadecimal to Buffer
  const keyHex = process.env.ENCRYPTION_KEY as string;
  const key = Buffer.from(keyHex, "hex");

  // Ensure the key length is correct
  if (key.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be a 32-byte (64 hex characters) key");
  }
  // Create the decipher using the AES-256-CBC algorithm
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  // Decrypt the content
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}