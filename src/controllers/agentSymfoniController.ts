import { agentSymfoni } from '../veramo/setup';

/**
 * createDIDSymfoni creates a did for the symfoni agent
 * @param alias optional name for the did, default is an empty string
 * @param provider optional provider for the did, default is 'did:ethr:rinkeby'
 * @param keyManagementSystem optional key management system for the did, default is 'local'
 */
async function createDIDSymfoni(alias?: string, provider?: string, keyManagementSystem?: string) {
	const DID = await agentSymfoni.didManagerCreate({
		alias: alias,
		provider: provider,
		kms: keyManagementSystem
	});

	return DID;
}