import assert from 'assert';
import {hashFile, isHashValid} from '../src/utils/fileHasher';

const PATH_TO_TEST_CONTRACT_0 = '__tests__/test data/test-arbeidskontrakt-00.pdf';
const PATH_TO_TEST_CONTRACT_1 = '__tests__/test data/test-arbeidskontrakt-01.pdf';
const TEST_CONTRACT_0_HASH = 'a21888557401c7e6e8fc12123e48fe11597084b67a7127dd7844a32006210d9d';

describe('the file hash script', function (){
	describe('the hash file function', function() {
		it('should create a hash of a file', function () {
			const fileHash = hashFile(PATH_TO_TEST_CONTRACT_0);
			const expectedHash = TEST_CONTRACT_0_HASH;
			assert.equal(fileHash, expectedHash);

		});
		it('should return an empty string if you input an invalid file', function () {
			const fileHash = hashFile('notAfilePath');
			assert.equal(fileHash, '');
		});

	});
	describe('the isHashValid function', function (){
		it('should return true if the same file is hashed twice', function () {
			const fileHash1 = hashFile(PATH_TO_TEST_CONTRACT_0);
			const isEqual = isHashValid(fileHash1, PATH_TO_TEST_CONTRACT_0);
			assert.equal(isEqual, true);
		});
		it('should return false if two different files are hashed', function () {
			const fileHash1 = hashFile(PATH_TO_TEST_CONTRACT_0);
			const isEqual = isHashValid(fileHash1, PATH_TO_TEST_CONTRACT_1);
			assert.equal(isEqual, false);
		});
	});
});