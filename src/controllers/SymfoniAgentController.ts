import { VerifiableCredential } from '@veramo/core';
import { PROOF_FORMAT_JWT, SCHEMA_EMPLOYMENT_CONTRACT, SCHEMA_TERMINATION_CREDENTIAL, SCHEMA_W3_CREDENTIAL, TYPE_EMPLOYMENT_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL, TYPE_VERIFIABLE_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { ISymfoniAgentController } from '../interfaces/symfoniControllerInterface';
import { employmentVC } from '../types/employmentVCType';
import { terminationVC } from '../types/terminationVCType';
import { agentSymfoni } from '../veramo/setup';
import { AgentController } from './AgentController';

/**
 * AgentSymfoniController is a factory class that controls the actions of the symfoni agent.
 */
export class SymfoniAgentController extends AgentController implements ISymfoniAgentController{
	// TODO: make it so that the class automatically initializes and keeps a main did for the agent

	constructor(mainIdentifierAlias: string) {
		super(agentSymfoni, mainIdentifierAlias);
	}

	/**
	 * createEmploymentCredential generates an employment credential.
	 * @param issuer the did of the issuer.
	 * @param credentialData the claims for the credential subject, see 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/employmentContractSchema.json', 
	 * for schema. 
	 * @returns an employment credential.
	 */
	async createEmploymentCredential(issuer: string, credentialData: employmentVC['credentialSubject']): Promise<VerifiableCredential | Error> {
		try {
			const credential = await this.agent.createVerifiableCredential({
				credential: {
					'@context': [SCHEMA_W3_CREDENTIAL, SCHEMA_EMPLOYMENT_CONTRACT],
					type: [TYPE_VERIFIABLE_CREDENTIAL, TYPE_EMPLOYMENT_CREDENTIAL],
					issuer: {
						id: issuer
					},
					credentialSubject: credentialData
				},
				proofFormat: PROOF_FORMAT_JWT
			});
	
			return credential;
		} catch (error) {
			console.error('unable to create the employment credential',error);
			return new Error('unable to create the employment credential');
		}
	}

	/**
	 * createTerminationCredential generates a termination credential.
	 * @param issuer the did of the issuer.
	 * @param credentialData the claims of the credential subject, see 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/terminationSchema.json',
	 * for schema.
	 * @returns a termination credential.
	 */
	async createTerminationCredential(issuer: string, credentialData: terminationVC['credentialSubject']): Promise<VerifiableCredential | Error> {
		try {
			const credential = await this.agent.createVerifiableCredential({
				credential: {
					'@context': [SCHEMA_W3_CREDENTIAL, SCHEMA_TERMINATION_CREDENTIAL],
					type: [TYPE_VERIFIABLE_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL],
					issuer: {
						id: issuer
					},
					credentialSubject: credentialData
				},
				proofFormat: PROOF_FORMAT_JWT
			});
	
			return credential;
		} catch (error) {
			console.error('unable to create the termination credential', error);
			return new Error('unable to create the termination credential');
		}
	}
}