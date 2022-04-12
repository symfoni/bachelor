import { VerifiableCredential } from '@veramo/core';
import { TYPE_EMPLOYMENT_CREDENTIAL, TYPE_PERSON_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { agentNAV } from '../veramo/setup';
import { AgentController } from './AgentController';
import verifiableRegistry from '../../verifiableRegistry.json';
import { validateSchemaWithURL } from '../utils/schemaValidation';

// expected interface of a message containing a VC
interface IVCMessageData {
	vc: {
		'@context': [string, string]
		type: [string, string]
		credentialSubject: object
	}
	sub: string
	nbf: number
	iss: string
}

export class NAVAgentController extends AgentController {
	constructor(mainIdentifierAlias: string) {
		super(agentNAV, mainIdentifierAlias);
	}

	async qualifiesForUnemploymentBenefits(presentationToken: string): Promise<boolean> {
		// handle message with token
		

		return false;
	}

	/**
	 * verifyIssuers takes a list of verifiable credentials and verifies their issuers against a verifiable registry.
	 * * the registry is just a json-file in the git.
	 * @param credentials a list of verifiable credentials.
	 * @returns true if all the credentials have the right issuer as listed in the verifiable data registry.
	 */
	private async verifyIssuers(credentials: VerifiableCredential[]): Promise<boolean | Error>{
		try {
			// loop through each credential
			for (let index = 0; index < credentials.length; index++) {
			
				// TODO: Possibly refactor the message handling part into its own function as it is used many times.
				// handle message with credential token
				const handledMessage: any = await this.agent.handleMessage({
					raw: credentials[index].proof.jwt
				});

				if (handledMessage.data == null) {
					break;
				}

				const messageData: IVCMessageData = handledMessage.data;

				if (messageData.vc.type.at(1) === TYPE_EMPLOYMENT_CREDENTIAL) {
					if (!(messageData.iss === verifiableRegistry.symfoni)) {
						return false;
					}	
				}

				if (messageData.vc.type.at(1) === TYPE_TERMINATION_CREDENTIAL) {
					if (!(messageData.iss === verifiableRegistry.symfoni)) {
						return false;
					}
				}

				if (messageData.vc.type.at(1) === TYPE_PERSON_CREDENTIAL) {
					if (!(messageData.iss === verifiableRegistry.state)) {
						return false;
					}
				}
			}

			// return true if all issuers are valid
			return true;
		} catch (error) {
			return new Error('something went wrong');
		}
	}

	async verifySchemas(credentials: VerifiableCredential[]): Promise<boolean | Error> {
		for (let index = 0; index < credentials.length; index++) {
			
			// TODO: Possibly refactor the message handling part into its own function as it is used many times.
			const handledMessage: any = await this.agent.handleMessage({
				raw: credentials[index].proof.jwt
			});

			if (handledMessage.data == null) {
				break;
			}

			const messageData: IVCMessageData = handledMessage.data;

			const schemaURL = messageData.vc['@context'][1];
			const credentialObject = messageData.vc.credentialSubject;
			
			// if one of the credentials does not validate against their own schema, return false
			if (!validateSchemaWithURL(schemaURL, credentialObject)) {
				return false;
			}
			
		}
		return true;
	}
}