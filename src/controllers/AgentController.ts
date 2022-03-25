import {
	DIDResolutionResult,
	IDataStore,
	IDIDManager,
	IIdentifier,
	IResolver,
	TAgent,
	VerifiableCredential,
	VerifiablePresentation
} from '@veramo/core';
import { ICredentialIssuer } from '@veramo/credential-w3c';
import { IDataStoreORM, UniqueVerifiableCredential } from '@veramo/data-store';
import { PROOF_FORMAT_JWT, TYPE_VERIFIABLE_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { IAgentController } from '../interfaces/agentControllerInterface';

/**
 * AgentController is a class that handles fundemental operations provided by the veramo agent.
 */
export class AgentController implements IAgentController {

	mainIdentifierAlias: string;

	agent: TAgent<IDataStore & IDataStoreORM & ICredentialIssuer & IResolver & IDIDManager>;

	// TODO: Find a better type than 'any'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(agent: any, mainIdentifierAlias: string) {
		this.agent = agent;
		this.mainIdentifierAlias = mainIdentifierAlias;
	}

	/**
	 * getMainIdentifier retrieves the main identifier of 'this.agent', provided by 'this.mainIdentifierAlias'
	 * if it does not exist, the function will create and return a new main identifier.
	 * // TODO: Possibly make a 'this.mainDid' field and make a main identifier when a new instance of AgentController class is instanziated.
	 * @returns either an existing identifier or a newly created identifier.
	 */
	async getMainIdentifier(): Promise<IIdentifier | Error> {
		try {
			return await this.agent.didManagerGetByAlias({
				alias: this.mainIdentifierAlias,
				provider: 'did:ethr:rinkeby'
			});
		} catch (error) {
			console.log('it did not exist');
			return await this.createDID(this.mainIdentifierAlias);
		}
	}

	/**
	 * createDID creates a did for an agent.
	 * @param alias the alias of the did as a string
	 * @param provider the provider of the did, eg. 'did:web', or 'did:ethr:rinkeby', as a string.
	 * @param keyManagementSystem the key management systemm for the did, as a string.
	 * @returns the did that was created.
	 */
	async createDID(alias?: string, provider = 'did:ethr:rinkeby', keyManagementSystem = 'local'): Promise<IIdentifier | Error> {
		try {
			return await this.agent.didManagerCreate({
				alias: alias,
				provider: provider,
				kms: keyManagementSystem
			});
		}
		catch (error) {
			console.error('unable to create did', error);
			return new Error('unable to create did');
		}
	}


	/**
	 * verifyJWT uses the Veramo message handler to verify if the JWT is valid
	 * and not tampered with.
	 * @param jwt the jwt token as a string.
	 * @returns true or false.
	 */
	async verifyJWT(jwt: string): Promise<boolean | Error> {
		try {
			await this.agent.handleMessage({
				raw: jwt,
			});
			return true;
		} catch (error) {
			console.error('JWT is not valid', error);
			return false;
		}
	}

	/**
	 * getDID retrieves a DID based on its did url.
	 * @param did the did url you want to search for.
	 * @returns returns the did that was found.
	 */
	async getDID(did: string): Promise<IIdentifier | Error> {
		try {
			return await this.agent.didManagerGet({
				did: did
			});
		} catch (error) {
			console.error('unable to retrieve did', error);
			return new Error('unable to retrieve did');
		}
	}

	/**
	 * listAllDIDs finds all DIDs created by the current agent.
	 * @returns all the DIDs in a list.
	 */
	async listAllDIDs(): Promise<IIdentifier[]> {
		return await this.agent.didManagerFind();
	}

	/**
	 * listDIDsBasedOnProvider finds all DIDs created by this agent based on the provider.
	 * @param provider the did method that the did is created by, eg. 'did:web', 'did:ethr'.
	 * @returns a list of dids with the corresponding provider.
	 */
	async listDIDsBasedOnProvider(provider: string): Promise<IIdentifier[] | Error> {
		try {
			return await this.agent.didManagerFind({
				provider: provider
			});
		} catch (error) {
			console.error('no matches found  for this provider', error);
			return new Error('no matches found  for this provider');
		}
	}

	/**
	 * listDIDsBasedOnAlias finds all DIDs created by this agent based on the provider.
	 * @param alias the alias for the did you want to find.
	 * @returns a list of dids with the corresponding alias.
	 */
	async listDIDsBasedOnAlias(alias: string): Promise<IIdentifier[] | Error> {
		try {
			return await this.agent.didManagerFind({
				alias: alias
			});
		} catch (error) {
			console.error('no matches found for this alias', error);
			return new Error('no matches found for this alias');
		}
	}

	/**
	* resolveDID resolves any DID based on its URL.
	* @param didUrl the DID url of the DID document you want to retrieve.
	* @returns a DID document with the corresponding did URL.
	*/
	async resolveDID(didUrl: string): Promise<DIDResolutionResult | Error> {
		try {
			return await this.agent.resolveDid({
				didUrl: didUrl
			});
		} catch (error) {
			console.error('was not able to resolve did', error);
			return new Error('was not able to resolve did');
		}
	}

	/**
	 * createCredential uses the agent to create a verifiable credential.
	 * @param credentialData the data that the credential should contain.
	 * @returns a verifiable credential.
	 */
	async createCredential(credentialData: VerifiableCredential): Promise<VerifiableCredential | Error> {
		try {
			return this.agent.createVerifiableCredential({
				credential: credentialData,
				proofFormat: PROOF_FORMAT_JWT
			});
		} catch (error) {
			console.error('unable to create the verifiable credential', error);
			return new Error('unable to create the verifiable credential');
		}
	}

	/**
	 * addCredential takes a credential as input and stores the credential in a database managed by 'this.agent'.
	 * @param credential a verifiable credential.
	 * @returns the hash of the credential that was created.
	 */
	async addCredential(credential: VerifiableCredential): Promise<string | Error> {
		try {
			return await this.agent.dataStoreSaveVerifiableCredential({
				verifiableCredential: credential
			});
		} catch (error) {
			console.log('unable to add credential to database', error);

			return new Error('unable to add credential to database');
		}
	}

	/**
	 * getAllCredentials retrieves all credential stored by 'this.agent'.
	 * @returns returns a list of credentials.
	 */
	async getAllCredentials(): Promise<UniqueVerifiableCredential[]> {
		return await this.agent.dataStoreORMGetVerifiableCredentialsByClaims({
			where: []
		});
	}

	/**
	 * getCredentialBasedOnType retrieves credentials based on type, eg. 'EmploymentVC'.
	 * @param credentialType the type of the credential you want to retrieve.
	 * @returns credentials in a list with the matching type.
	 */
	async getCredentialBasedOnType(credentialType: string): Promise<UniqueVerifiableCredential[]> {
		return await this.agent.dataStoreORMGetVerifiableCredentialsByClaims({
			where: [{ column: 'credentialType', value: [`${TYPE_VERIFIABLE_CREDENTIAL},${credentialType}`] }]
		});
	}

	/**
	 * createPresentation creates a verifiable presentation.
	 * @param holder the holder of the presentation as a did.
	 * @param credentials the credentials you want to add into the presentation as an array of verifiable credentials.
	 * @returns a verifiable presentation.
	 */
	async createPresentation(holder: string, credentials: VerifiableCredential[]): Promise<VerifiablePresentation | Error> {
		try {
			return await this.agent.createVerifiablePresentation({
				presentation: {
					holder: holder,
					verifiableCredential: credentials
				},
				proofFormat: PROOF_FORMAT_JWT
			});
		} catch (error) {
			console.log('unable to create presentation', error);
			return new Error('unable to create presentation');
		}
	}

	// TODO: Make a function that can verify a credential
	// TODO: Make a function that can send a credential
}