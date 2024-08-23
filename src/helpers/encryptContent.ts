import crypto from 'crypto';

export default function encryptContent(content: string) : string{
  const algorithm = "aes-256-cbc";
  const keyHex = process.env.ENCRYPTION_KEY as string;
  const key = Buffer.from(keyHex, "hex");
  if (key.length !== 32) {
    throw new Error("Key must be 32 characters long");
  }
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(content, "utf-8", "hex");
  encrypted += cipher.final("hex");

  // Return the IV and encrypted content in hexadecimal format, separated by ':'
  return iv.toString("hex") + ":" + encrypted;
}