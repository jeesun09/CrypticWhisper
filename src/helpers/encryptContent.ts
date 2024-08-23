import crypto from 'crypto';

export default function encryptContent(content: string) : string{
    const algorithm = 'aes-256-cbc';
    const key = process.env.ENCRYPTION_KEY as string;
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(content);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}