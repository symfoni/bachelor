import { agentSymfoni } from '../veramo/setup';


/**
 * createDIDSymfoni creates a did for the symfoni agent
 * @param alias optional name for the did, default is an empty string
 * @param provider optional provider for the did, default is 'did:ethr:rinkeby'
 * @param keyManagementSystem optional key management system for the did, default is 'local'
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
 * TODO: Possibly remake the function so that it may find a union of provider and alias results.
 * listDIDsSymfoni finds all dids registered by the Symfoni agent based on either alias or provider.
 * If neither is provided, the function will find all DIDs created by the symfoni agent.
 * @param alias search based on the alias of the DID as a string
 * @param provider search based on the provider of the DID as a string
 * @returns returns a list DIDs
 */
async function listDIDsSymfoni(alias?: string, provider?: string) {
	if (typeof alias === 'string' && typeof provider === 'string') {
		return 'You can only search for either alias or provider, not both.';
	} else if (typeof alias === 'string') {
		const DIDs = await agentSymfoni.didManagerFind({
			alias: alias
		});
		return DIDs;
	} else if (typeof provider === 'string') {
		const DIDs = await agentSymfoni.didManagerFind({
			provider: provider
		});
		return DIDs;
	} else {
		const DIDs = await agentSymfoni.didManagerFind();
		return DIDs;
	}
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