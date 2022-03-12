import { VerifiableCredential } from '@veramo/core';
import { PROOF_FORMAT_JWT, SCHEMA_EMPLOYMENT_CONTRACT, SCHEMA_W3_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { employmentVC } from '../types/employmentVCType';
import { agentSymfoni } from '../veramo/setup';
import { AgentController } from './AgentController';

/**
 * AgentSymfoniController is a factory class that controls the actions of the symfoni agent.
 */
export class SymfoniAgentController extends AgentController {
	// TODO: make it so that the class automatically initializes and keeps a main did for the agent

	constructor() {
		super(agentSymfoni);
	}

	/**
	 * createEmploymentCredential generates an employment credential.
	 * @param issuer the did of the issuer, default is the main identifier, 'this.did'.
	 * @param credentialData the claims for the credential subject, see 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/employmentContractSchema.json', 
	 * for schema. 
	 * @returns an employment credential.
	 */
	async createEmploymentCredential(issuer: string, credentialData: employmentVC['credentialSubject']): Promise<VerifiableCredential | string> {
		if (typeof issuer === 'undefined') {
			return 'error';
		}
		const credential = await this.agent.createVerifiableCredential({
			credential: {
				'@context': [SCHEMA_W3_CREDENTIAL, SCHEMA_EMPLOYMENT_CONTRACT],
				issuer: {
					id: issuer
				},
				credentialSubject: {
					credentialData
				}
			},
			proofFormat: PROOF_FORMAT_JWT
		});

		return credential;
	}
}