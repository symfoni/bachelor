import crypto from 'crypto';
import fs from 'fs';

export function hashFile(filePath: string): string {
	const targetFile = fs.readFileSync(filePath);

	const hash = crypto.createHash('sha256');

	const fileHash = hash.update(targetFile).digest('hex');

	return fileHash;
}
