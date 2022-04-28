import { VerifiableCredential } from '@veramo/core';
import { PROOF_FORMAT_JWT, SCHEMA_BUSINESS_CREDENTIAL, SCHEMA_PERSON_CREDENTIAL, SCHEMA_W3_CREDENTIAL, TYPE_BUSINESS_CREDENTIAL, TYPE_PERSON_CREDENTIAL, TYPE_VERIFIABLE_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { IStateAgentController } from '../interfaces/stateAgentController.interface';
import { businessVerifiableCredential } from '../types/businessVCtype';
import { personVerifiableCredential } from '../types/personVCType';
import { agentState } from '../veramo/setup';
import { AgentController } from './AgentController';

/**
 * StateAgentController is a class that manages the state agent.
 */
export class StateAgentController extends AgentController implements IStateAgentController{
	
	/**
	 * The constructor is used to set which agent the class should control
	 * and what the alias for the main identifier should be.
	 * @param mainIdentifierAlias the alias of the main identifier, defaults to 'state'.
	 */
	constructor(mainIdentifierAlias = 'state') {
		super(agentState, mainIdentifierAlias);
	}

	/**
	 * createPersonCredential creates a verifiable person credential.
	 * @param issuerDid a did managed by the state agent that issues the credential.
	 * @param credentialSubjectData the claims of the person.
	 * @returns a verifiable person credential.
	 */
	async createPersonCredential(issuerDid: string, credentialSubjectData: personVerifiableCredential['credentialSubject']): Promise<VerifiableCredential | Error> {
		try {
			const credential = await this.agent.createVerifiableCredential({
				credential: {
					'@context': [SCHEMA_W3_CREDENTIAL, SCHEMA_PERSON_CREDENTIAL],
					type: [TYPE_VERIFIABLE_CREDENTIAL, TYPE_PERSON_CREDENTIAL],
					issuer: {
						id: issuerDid
					},
					credentialSubject: credentialSubjectData
				},
				proofFormat: PROOF_FORMAT_JWT
			});
			
			return credential;
		
		} catch (error) {
			console.error('unable to create the credential', error);
			return new Error('unable to create the credential');
		}
	}

	/**
	 * createBusinessCredential creates a verifiable business credential.
	 * @param issuerDid a did managed by the state agent that issues the credential.
	 * @param credentialSubjectData the business claims.
	 * @returns a verifiable business credential.
	 */
	async createBusinessCredential(issuerDid: string, credentialSubjectData: businessVerifiableCredential['credentialSubject']): Promise<VerifiableCredential | Error> {
		try {
			const credential = await this.agent.createVerifiableCredential({
				credential: {
					'@context': [SCHEMA_W3_CREDENTIAL, SCHEMA_BUSINESS_CREDENTIAL],
					type: [TYPE_VERIFIABLE_CREDENTIAL, TYPE_BUSINESS_CREDENTIAL],
					issuer: {
						id: issuerDid
					},
					credentialSubject: credentialSubjectData
				},
				proofFormat: PROOF_FORMAT_JWT
			});
		
			return credential;
		
		} catch (error) {
			console.error('unable to create the credential', error);
			return new Error('unable to create the credential');
		}
	}
}