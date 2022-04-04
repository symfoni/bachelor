import crypto from 'crypto';

/**
 * hashString takes a string and hashes it using the sha256 algorithm.
 * @param string any string as input.
 * @returns the hashed value of the string.
 */
export function hashString(string:string) {
	// the hashing algorithm
	const hash = crypto.createHash('sha256');

	// hashing the string
	const stringHash = hash.update(string).digest('hex');

	return stringHash;
}