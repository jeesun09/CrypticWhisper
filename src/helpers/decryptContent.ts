import crypto from 'crypto';

export default function decryptContent(encryptedContent: string): string{
    const algorithm = 'aes-256-cbc';
    const [iv, encrypted] = encryptedContent.split(':');
    const key = process.env.ENCRYPTION_KEY as string;

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}