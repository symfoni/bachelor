import assert from 'assert';
import { after, before, it } from 'mocha';
import { AnyObject } from 'yup/lib/types';
import { SCHEMA_W3_CREDENTIAL } from '../src/constants/verifiableCredentialConstants';
import { AgentController } from '../src/controllers/AgentController';
import { agentTest, dbConnectionTest } from '../src/veramo/setup';
import exampleCredential from './test data/exampleCredential.json';

const testAgentController = new AgentController(agentTest, 'test');
const testJWT = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zeW1mb25pL2JhY2hlbG9yL2Rldi9zY2hlbWFzL3Rlcm1pbmF0aW9uU2NoZW1hLmpzb24iXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIlRlcm1pbmF0aW9uVkMiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsidGVybWluYXRpb24iOnsiZW1wbG95ZWUiOnsibGFzdERheUF0V29yayI6IjIwMjEtMDItMDIiLCJsYXN0UGF5ZGF5IjoiMjAyMS0wMi0wMiIsInRlcm1pbmF0aW9uU3RhdHVzIjoicmVzaWduZWQiLCJ0ZXJtaW5hdGVkRHVyaW5nVHJpYWxQZXJpb2QiOnRydWUsIldlZWtseVdvcmtIb3VycyI6MjIsInRlcm1pbmF0aW9uTm90aWNlUmVjZWl2ZWQiOiIyMDIxLTAyLTAyIn0sImNvbnRyYWN0UERGIjp7IlVSTCI6Imh0dHBzOi8vcGRmcy5jb20vcGRmMC5wZGYiLCJoYXNoIjoiODc0M2I1MjA2M2NkODQwOTdhNjVkMTYzM2Y1Yzc0ZjUifX19fSwic3ViIjoiZGlkOmV0aHI6cmlua2VieToweDAyMDZiYzJkNzE5NzIxNTE5ZmQ3ZTBhYzU4MjI0Njg4ZTFjNWNjOWJlNWNmM2ZjNjdlYzRmOTM3ZGI5NTg1ZWVmNiIsIm5iZiI6MTY0OTE4OTgwNSwiaXNzIjoiZGlkOmV0aHI6cmlua2VieToweDAzMDBjZDBkZmE5ZjBiNTc2NDc0M2YxM2YyMTg3MTI2MmYzODUwNjQ3ZThlMGYwMTNiYzEwZjFhNDAwMzYxNWU2YSJ9.YkXKncqMqFKZFaDTASdCQaz5rrW-5DkSk6ErlEEl9jKH2wRtNexSB4DO88n_24Pur5HbfgYou147d5Bo31Shrw';
let testDidUrl: string;
let testCredentialData: AnyObject;

before(async function () {
	// Makes and saves a did for the test cases.
	await testAgentController.createDID('test0').then((did)=>{
		if (did instanceof Error) {
			return;
		}
		testDidUrl = did.did;
	});

	// Creates a couple more dids for testing.
	await testAgentController.createDID('test1', 'did:web');
	await testAgentController.createDID('test2');
	
	// Setting up a sample credential data for testing.
	testCredentialData = {
		type: ['VerifiableCredential', 'TestCredential'],
		issuer: {
			id: testDidUrl
		},
		'@context': [SCHEMA_W3_CREDENTIAL],
		credentialSubject: {
			'name': 'Ola',
			'age': 25
		}
	};

	// Override console.log and console.error with empty functions to supress function logging when testing
	// making it easier to read the test result.
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	console.log = function () {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	console.error = function () {};
	
});

after(async function () {
	// Resets the test database after each run.
	await dbConnectionTest.then((testDb)=>{
		testDb.dropDatabase();
	});
});

describe('AgentController', async function () {

	describe('createDID', async function () {

		it('should create a DID with the correct alias, provider, and kms', async function () {
			const alias = 'test1';
			const provider = 'did:ethr:rinkeby';
			const keyManagementSystem = 'local';
			await testAgentController.createDID(alias, provider, keyManagementSystem).then((did) => {
				// Works
				if (did instanceof Error) {
					assert.fail();
				}
				assert.equal(did.alias, alias);
				assert.equal(did.provider, provider);
				assert.equal(did.keys.at(0)?.kms, keyManagementSystem);
			});

		});


		it('should return an error if the provider does not exist', async function () {
			const provider = 'not:a:valid:did:method';
			await testAgentController.createDID(undefined, provider).then((did) => {
				if (did instanceof Error) {
					assert.ok;
				}
			});
		});
	});

	describe('getDID', function () {

		it('should return a DID with the url that you searched for', async function () {
			await testAgentController.getDID(testDidUrl).then((did)=>{
				if (did instanceof Error) {
					assert.fail;
					return;
				}
				assert.equal(did.did, testDidUrl);
			});
		});

		it('should return a error message if it did not find anything', async function () {
			await testAgentController.getDID('this did does not exist').then((did)=>{
				if (did instanceof Error) {
					assert.ok;
				}
			});
		});
	});


	describe('listAllDIDs', function () {

		it('should list all the dids in the database', async function () {
			await testAgentController.listAllDIDs().then((dids)=>{
				assert.equal(dids.length, 4);
			});
		});

	});

	describe('listDIDsBasedOnProvider', async function () {

		it('should return all DIDs from the provider you searched for', async function () {
			await testAgentController.listDIDsBasedOnProvider('did:ethr:rinkeby').then((dids)=>{
				if (dids instanceof Error) {
					assert.fail();
				}
				assert.equal(dids.length, 3);
			});
		});
		it('should only return DIDs with the provider that was provided', async function () {
			await testAgentController.listDIDsBasedOnProvider('did:ethr:rinkeby').then((dids)=>{
				if (dids instanceof Error) {
					assert.fail();
				}
				dids.map((did)=>{
					assert.equal(did.provider, 'did:ethr:rinkeby');
				});
			});
		});

		it('should return an error if the provider does not exist', async function () {
			await testAgentController.listDIDsBasedOnProvider('did:not:valid').then((dids)=>{
				if (dids instanceof Error) {
					assert.ok;
				}	
			});
		});

	});

	describe('listDIDsBasedOnAlias', async function () {

		it('should return all the DIDs based on the alias you searched for', async function () {
			await testAgentController.listDIDsBasedOnAlias('test1').then((dids)=>{
				if (dids instanceof Error) {
					assert.fail();
				}
				assert.equal(dids.length, 2);
			});
		});
		it('should only return DIDs with the same alias that you searched for', async function () {
			await testAgentController.listDIDsBasedOnAlias('test1').then((dids)=>{
				if (dids instanceof Error) {
					assert.fail();
				}
				dids.map((did)=>{
					assert.equal(did.alias, 'test1');
				});
			});
		});

	});

	describe('resolveDID', function () {
		this.timeout(15000);
		it('should retrieve a DID document with the same DID url that you searched for', async function () {
			await testAgentController.resolveDID(testDidUrl).then((did)=>{
				if (did instanceof Error) {
					assert.fail();
				}
				assert.equal(did.didDocument?.id, testDidUrl);
			});
		});

		it('should return an error if the did does not exist', async function () {
			await testAgentController.resolveDID('did:not:valid').then((did)=>{
				if (did instanceof Error) {
					assert.ok;
				}
			});
		});
	});

	describe('createCredential', async function () {

		it('it should create a credential with the matching credential data', async function () {
			await testAgentController.createCredential(testCredentialData).then((credential)=>{
				if (credential instanceof Error) {
					assert.fail();
				}
				assert.equal(credential.proof.type, 'JwtProof2020');
				assert.equal(credential.credentialSubject.toString(), testCredentialData.credentialSubject.toString());
				assert.equal(credential['@context'].toString(), testCredentialData['@context'].toString());
				assert.equal(credential.type.toString(), testCredentialData.type.toString());
			});
		});

	});

	describe('getMainIdentifier', async function () {
		
		it('should retrieve the main identifier with the same alias that was passed to the controller object', async function () {
			await testAgentController.getMainIdentifier().then((mainDid)=>{
				if (mainDid instanceof Error) {
					assert.fail();
				}
				assert.equal(mainDid.alias, 'test');
			});
		});
	});

	describe('verifyJWT', async function () {
		this.timeout(15000);
		it('should return true if the token is valid', async function () {
			await testAgentController.verifyJWT(testJWT).then((isValid)=>{
				assert.equal(isValid, true);
			});
		});

		it('should return false if the token is not valid', async function () {
			await testAgentController.verifyJWT('').then((isValid)=>{
				assert.equal(isValid, false);
			});
		});

	});

	describe('addCredential', function () {
		it('should not return an error if it successfully added a credential to the database', async function () {
			await testAgentController.addCredential(exampleCredential.credential).then((credentialHash)=>{
				if (typeof credentialHash === 'string') {
					assert.ok;
				}
			});
		});
		it('should return an error if it was unsuccessful in adding a credential to the database', async function () {
			await testAgentController.addCredential(exampleCredential.credential).then((credentialHash)=>{
				if (credentialHash instanceof Error) {
					assert.ok;
				}
			});
		});
	});

	describe('getAllCredentials', function () {
		it('should list all the credentials in the database', async function () {
			await testAgentController.getAllCredentials().then((credentials)=>{
				assert.equal(credentials.length, 1);
			});
		});
	});

	describe('getCredentialBasedOnType', function () {
		it('should list the number of credentials in the database with the matching type', async function () {
			await testAgentController.getCredentialBasedOnType('TerminationVC').then((credentials)=>{
				assert.equal(credentials.length, 1);
			});
		});

		it('should only list credentials with the matching type', async function () {
			await testAgentController.getCredentialBasedOnType('TerminationVC').then((credentials)=>{
				credentials.map((credential)=>{
					assert.equal(credential.verifiableCredential.type.at(1), 'TerminationVC');
				});
			});
		});
	});

	describe('createPresentation', function () {
		it('should return a presentation with the credentials that was passed to the function', async function () {
			await testAgentController.createPresentation(testDidUrl, [exampleCredential.credential]).then((presentation)=>{
				if (presentation instanceof Error) {
					assert.fail();
				}
				assert.equal(presentation.verifiableCredential?.at(0)?.proof.jwt, exampleCredential.credential.proof.jwt);
			});
		});

	});

});