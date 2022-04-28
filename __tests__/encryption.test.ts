import assert from 'assert';
import { describe } from 'mocha';
import { hashString } from '../src/utils/encryption';

const preHashedString = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';

describe('encryption', function () {
	describe('the hash string function', function () {
		it('should hash a string to the expected output', function () {
			const hashedString = hashString('test');
			assert.equal(hashedString, preHashedString);
		});
	});
});