import assert from 'assert';
import { after, before, it } from 'mocha';
import { AgentController } from '../src/controllers/AgentController';
import { agentTest, dbConnectionTest } from '../src/veramo/setup';

/*
* før hver test, rens databasen og legg til 'ferske' elementer
* test createDID, sjekk at alias, provider, og kms er tilstede i DIDden og at de har riktig verdi, se at den ble lagret i databasen
* test getDID, sjekk at den ikke får et tomt objekt, se at DIDen i dokumentet stemmer med DIDen vi søkte etter
* listAllDIDS, sjekk at antall DIDs i listen stemmer
* listBasedOnProvider, sjekk at vi får riktig antall, og at provider stemmer overens
* listBasedOnAlias, sjekk at vi får riktig antall, og at alias stemmer overens
* resolveDID, sjekk at DID url stemmer overens med DIDen vi ønsket å resolve, og at objektet ikke er tomt
* createCredential, sjekk at credential dataen stemmer overens med det vi fylte inn
*/

const testAgentController = new AgentController(agentTest, 'test');
let testDidUrl: string;

before(async function () {

	await testAgentController.createDID('test0').then((did)=>{
		if (did instanceof Error) {
			return;
		}
		testDidUrl = did.did;
	});
	await testAgentController.createDID('test1', 'did:web');
	await testAgentController.createDID('test2');
	
	// Override console.log and console.error with empty functions to supress function logging when testing
	// making it easier to read the test result.
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	console.log = function () {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	console.error = function () {};
	
});

after(async function () {
	// clean database file
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

		it('should return a DID with the correct alias, provider, and kms', function () {
			// assert
		});

	});

	describe('listDIDsBasedOnProvider', function () {

		it('should return all DIDs from the provider you searched for', function () {
			// assert 
		});
		it('should only return DIDs returned has the provider you serched for', function () {
			// assert 
		});

	});

	describe('listDIDsBasedOnAlias', function () {

		it('should return all the DIDs based on the alias you searched for', function () {
			// assert 
		});
		it('should only return DIDs with the same alias that you searched for', function () {
			// assert 
		});

	});

	describe('resolveDID', function () {

		it('should retrieve a DID document with the same DID url that you searched for', function () {
			// assert 
		});

	});

	describe('createCredential', function () {

		it('it should create a credential with the matching credential data', function () {
			// assert 
		});

	});

});