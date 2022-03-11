import { VerifiableCredential } from '@veramo/core';
import { PROOF_FORMAT_JWT, SCHEMA_EMPLOYMENT_CONTRACT, SCHEMA_W3_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { employmentVC } from '../types/employmentVCType';
import { agentSymfoni } from '../veramo/setup';
import { AgentController } from './AgentController';

const MAIN_ALIAS_SYMFONI = 'symfoni';

/**
 * AgentSymfoniController is a factory class that controls the actions of the symfoni agent.
 */
export class SymfoniAgentController extends AgentController {
	// TODO: make singleton

	/**
	 * The main alias.
	 */
	private alias = MAIN_ALIAS_SYMFONI;
	/**
	 * The main did.
	 */
	private did: string;

	/**
	 * The constructor sets up a main identifier for the symfoni agent.
	 */
	private constructor(mainIdentifier: string) {
		super(agentSymfoni);
		this.did = mainIdentifier;
	}

	/**
	 * TODO: Make init a part of the AgentController class
	 * init initializes an object of the class and generates a main identifier, if it is not already present in the database.
	 * @returns an instance of SymfoniAgentController
	 */
	static async init(): Promise<SymfoniAgentController | undefined> {

		let mainDid: string;
		// list identifiers with alias
		await agentSymfoni.didManagerFind({
			alias: MAIN_ALIAS_SYMFONI
		}).then((identifier) => {

			// if identifier does not exist, make a new one
			if (identifier.length === 0) {
				agentSymfoni.didManagerCreate({
					alias: MAIN_ALIAS_SYMFONI
				}).then((createdDid) => {
					mainDid = createdDid.did;
					return new SymfoniAgentController(mainDid);
				});
			} else {
				// TODO: Find another less hacky solution
				const identifierDid = identifier.at(0)?.did;
				if (typeof identifierDid === 'undefined') {
					return;
				}
				mainDid = identifierDid;
				return new SymfoniAgentController(mainDid);
			}
		});
		return;
	}


	getMainDid() {
		return this.did;
	}

	getAlias() {
		return this.alias;
	}

	/**
	 * createEmploymentCredential generates an employment credential.
	 * @param issuer the did of the issuer, default is the main identifier, 'this.did'.
	 * @param credentialData the claims for the credential subject, see 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/employmentContractSchema.json', 
	 * for schema. 
	 * @returns an employment credential.
	 */
	async createEmploymentCredential(issuer = this.did, credentialData: employmentVC['credentialSubject']): Promise<VerifiableCredential | string> {
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