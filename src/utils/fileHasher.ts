import crypto from 'crypto';
import fs from 'fs';

/**
 * This function takes a file path and converts the file into a hash.
 * @param filePath the path to the file you want to convert as a string.
 * @returns a hash of the file based on the sha256 algorithm as a string.
 */
export function hashFile(filePath: string): string {
	try {
		const targetFile = fs.readFileSync(filePath);

		const hash = crypto.createHash('sha256');

		const fileHash = hash.update(targetFile).digest('hex');

		return fileHash;
	} catch (error) {
		console.error('file not found', error);
		return '';
	}
}

/**
 * This function checks if an input hash matches with the hash of a file.
 * @param hash the hash you want to compare the file hash to.
 * @param filePath the path to the file you want to convert as a string.
 * @returns true if the hash matches, and false if it does not.
 */
export function isHashValid(hash: string, filePath: string): boolean {
	const fileHash = hashFile(filePath);
	let isEqual = false;

	if (hash === fileHash) {
		isEqual = true;
		return isEqual;
	}

	return isEqual;
}