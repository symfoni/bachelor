import { PROOF_FORMAT_JWT } from '../constants/verifiableCredentialConstants';
import { employmentVC } from '../types/employmentVCType';
import { agentSymfoni } from '../veramo/setup';

// TODO: Make unit tests for these functions

/**
 * createDIDSymfoni creates a did for the symfoni agent.
 * @param alias optional name for the did, default is an empty string.
 * @param provider optional provider for the did, default is 'did:ethr:rinkeby'.
 * @param keyManagementSystem optional key management system for the did, default is 'local'.
 * @returns the created DID
 */
async function createDIDSymfoni(alias?: string, provider = 'did:ethr:rinkeby', keyManagementSystem = 'local') {
	const DID = await agentSymfoni.didManagerCreate({
		alias: alias,
		provider: provider,
		kms: keyManagementSystem
	});

	return DID;
}

/**
 * listDIDsSymfoniAll finds all DIDs created by the Symfoni agent.
 * @returns the DIDs in a list.
 */
async function listDIDsSymfoniAll() {
	const DIDs = await agentSymfoni.didManagerFind();

	return DIDs;
}

/**
 * listDIDsSymfoniAlias finds all DIDs created by the Symfoni agent based on alias.
 * @param alias the alias of the DID you want to find.
 * @returns a list of DIDs with the corresponding alias.
 */
async function listDIDsSymfoniAlias(alias: string) {
	const DIDs = await agentSymfoni.didManagerFind({
		alias: alias
	});

	return DIDs;
}

/**
 * listDIDsSymfoniAlias finds all DIDs created by the Symfoni agent based on provider.
 * @param provider the provider of the DIDs you want to find, eg. 'did:web' and 'did:ethr:rinkeby'
 * @returns a list of DIDs with the corresponding provider.
 */
async function listDIDsSymfoniProvider(provider: string) {
	const DIDs = await agentSymfoni.didManagerFind({
		provider: provider
	});

	return DIDs;
}

/**
 * getDID retrieves a specific did based on its id
 * @param didInput the did id as a string
 * @returns the corresponding did 
 */
async function getDIDSymfoni(didInput: string) {
	const DID = await agentSymfoni.didManagerGet({
		did: didInput
	});

	return DID;
}

/**
 * createEmploymentCredential makes a verifiable credential based on JSON data input.
 * @param credentialData JSON data of type employmentVC.
 * @returns the verifiable credential.
 */
async function createEmploymentCredential(credentialData: employmentVC) {
	const employmentCredential = await agentSymfoni.createVerifiableCredential({
		credential: {
			credentialData
		},
		proofFormat: PROOF_FORMAT_JWT
	});

	return employmentCredential;
}

/**
 * resolveDIDSymfoni resolves any DID based on its URL.
 * @param didUrl the DID url of the DID document you want to retrieve.
 * @returns a DID document with the corresponding did URL.
 */
async function resolveDIDSymfoni(didUrl: string) {
	const didDocument = await agentSymfoni.resolveDid({
		didUrl: didUrl
	});

	return didDocument;
}