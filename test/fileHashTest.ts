import assert from 'assert';
import {hashFile, isHashValid} from '../src/utils/fileHasher'
describe('the file hash script', function (){
    describe('the hash file function', function() {
        it('should create a hash of a file', function () {
            const fileHash = hashFile('test/test data/test-arbeidskontrakt-00.pdf')
            const expectedHash = 'a21888557401c7e6e8fc12123e48fe11597084b67a7127dd7844a32006210d9d'
            assert.equal(fileHash, expectedHash)

        });
        it('should return an empty string if you input an invalid file', function () {
            const fileHash = hashFile('notAfilePath')
            assert.equal(fileHash, '')
        });

    })
    describe('the isHashValid function', function (){
        it('should return true if the same file is hashed twice', function () {
            const fileHash1 = hashFile('test/test data/test-arbeidskontrakt-00.pdf');
            const isEqual = isHashValid(fileHash1, 'test/test data/test-arbeidskontrakt-00.pdf')
            assert.equal(isEqual, true)
        });
        it('should return false if two different files are hashed', function () {
            const fileHash1 = hashFile('test/test data/test-arbeidskontrakt-00.pdf');
            const isEqual = isHashValid(fileHash1, 'test/test data/test-arbeidskontrakt-01.pdf')
            assert.equal(isEqual, false)
        });
    })
})