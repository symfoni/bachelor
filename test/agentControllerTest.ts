import fs from 'fs'
import assert from 'assert';
import { before, it } from 'mocha';
import { AgentController } from '../src/controllers/AgentController';
import { agentTest } from '../src/veramo/setup';

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

const testAgentController = new AgentController(agentTest);

before(function () {
    // clean database file
    fs.writeFile('./database/test-database.sqlite', '', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    testAgentController.createDID('test0')
    testAgentController.createDID('test1', 'did:web')
    testAgentController.createDID('test2')
})

describe('AgentController', function () {

    describe('createDID', function () {

        it('should create a DID with the correct alias, provider, and kms', function () {
            const alias = 'test1';
            const provider = 'did:ethr:rinkeby';
            const keyManagementSystem = 'local'
            testAgentController.createDID(alias).then((did) => {
                // Works
                assert.equal(did['alias'], alias);
                assert.equal(did['provider'], provider);
                assert.equal(did['keys'][0]['kms'], keyManagementSystem)
            });

        });


        it('should return the expected error message if the provider does not exist', function () {
            const provider = 'not:a:valid:did:method'
            testAgentController.createDID(undefined, provider).then((did) => {
                assert.equal(did, 'unable to create did')
            })
        });
    });

    describe('getDID', function () {

        it('should return a DID with the url that you searched for', function () {
            // assert 
        });

        it('should return a error message if it did not find anything', function () {

        })
    });


    describe('listAllDIDs', function () {

        it('should return a DID with the correct alias, provider, and kms', function () {
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