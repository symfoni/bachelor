import { VerifiableCredential } from '@veramo/core';
import { PROOF_FORMAT_JWT, SCHEMA_BUSINESS_CREDENTIAL, SCHEMA_W3_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { personVerifiableCredential } from '../types/personVCType';
import { agentState } from '../veramo/setup';
import { AgentController } from './AgentController';

/**
 * StateAgentController is a class that manages the state agent.
 */
export class StateAgentController extends AgentController {
	constructor() {
		super(agentState);
	}

	/**
     * createPersonCredential creates a verifiable person credential.
     * @param issuerDid a did managed by the state agent that issues the credential.
     * @param credentialSubjectData the claims of the person.
     * @returns a verifiable person credential.
     */
	async createPersonCredential(issuerDid: string, credentialSubjectData: personVerifiableCredential['credentialSubject']): Promise<VerifiableCredential> {
		const credential = await this.agent.createVerifiableCredential({
			credential: {
				'@context': [SCHEMA_W3_CREDENTIAL, SCHEMA_BUSINESS_CREDENTIAL],
				issuer: {
					id: issuerDid
				},
				credentialSubject: {
					credentialSubjectData
				}
			},
			proofFormat: PROOF_FORMAT_JWT
		});

		return credential;
	}
}