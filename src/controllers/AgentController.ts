import { PROOF_FORMAT_JWT } from '../constants/verifiableCredentialConstants';
import { IAgentController } from '../interfaces/agentControllerInterface';
import { verifiableCredential } from '../types/verifiableCredential';

export class AgentController implements IAgentController {
	// TODO: fix type any to actually be of type agent if possible
	agent: any;

	constructor(agent: any) {
		this.agent = agent;
	}

	/**
     * createDID creates a did for an agent.
     * @param alias the alias of the did as a string
     * @param provider the provider of the did, eg. 'did:web', or 'did:ethr:rinkeby', as a string.
     * @param keyManagementSystem the key management systemm for the did, as a string.
     * @returns the did that was created.
     */
	async createDID(alias?: string, provider = 'did:ethr:rinkeby', keyManagementSystem = 'local'): Promise<any> {
		try {
			const did = await this.agent.didManagerCreate({
				alias: alias,
				provider: provider,
				kms: keyManagementSystem
			});
			return did;
		}
		catch (error) {
			console.error('unable to create did', error);
			return 'unable to create did';
		}
	}

	/**
     * getDID retrieves a DID based on its did url.
     * @param didUrl the did url you want to search for.
     * @returns returns the did that was found.
     */
	async getDID(did: string) {
		try {
			const didDocument = await this.agent.didManagerGet({
				did: did
			});
			return didDocument;
		} catch (error) {
			console.error('unable to retrieve did', error);
			return 'unable to retrieve did';
		}
	}

	/**
     * listAllDIDs finds all DIDs created by the current agent.
     * @returns all the DIDs in a list.
     */
	async listAllDIDs() {
		try {
			const DIDs = await this.agent.DIDManagerFind();

			return DIDs;

		} catch (error) {
			console.error('unable to list all DIDs', error);
			return 'unable to list all DIDs';
		}
	}

	/**
     * listDIDsBasedOnProvider finds all DIDs created by this agent based on the provider.
     * @param provider the did method that the did is created by, eg. 'did:web', 'did:ethr'.
     * @returns a list of dids with the corresponding provider.
     */
	async listDIDsBasedOnProvider(provider: string) {
		try {
			const dids = await this.agent.DIDManagerFind({
				provider: provider
			});
			return dids;
		} catch (error) {
			console.error('no matches found  for this provider', error);
			return 'no matches found  for this provider';
		}
	}

	/**
     * listDIDsBasedOnAlias finds all DIDs created by this agent based on the provider.
     * @param alias the alias for the did you want to find.
     * @returns a list of dids with the corresponding alias.
     */
	async listDIDsBasedOnAlias(alias: string) {
		try {
			const dids = await this.agent.DIDManagerFind({
				alias: alias
			});
			return dids;
		} catch (error) {
			console.error('no matches found for this alias', error);
			return 'no matches found for this alias';
		}
	}

	/**
    * resolveDID resolves any DID based on its URL.
    * @param didUrl the DID url of the DID document you want to retrieve.
    * @returns a DID document with the corresponding did URL.
    */
	async resolveDID(didUrl: string) {
		try {
			const didDocument = await this.agent.resolveDID({
				didUrl: didUrl
			});
			return didDocument;
		} catch (error) {
			console.error('was not able to resolve did', error);
			return 'was not able to resolve did';
		}
	}

	/**
     * createCredential uses the agent to create a verifiable credential.
     * @param credentialData the data that the credential should contain.
     * @returns a verifiable credential.
     */
	async createCredential(credentialData: verifiableCredential) {
		try {
			const credential = this.agent.createVerifiableCredential({
				credential: {
					credentialData
				},
				proofFormat: PROOF_FORMAT_JWT
			});
			return credential;
		} catch (error) {
			console.error('unable to create the verifiable credential', error);
			return 'unable to create the verifiable credential';
		}
	}

	// TODO: Make a function that can verify a credential
	// TODO: Make a function that saves a credential in the data store.
	// TODO: Make a function that can create VPs
}