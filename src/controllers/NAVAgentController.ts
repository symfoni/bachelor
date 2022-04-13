import { TYPE_EMPLOYMENT_CREDENTIAL, TYPE_PERSON_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { agentNAV } from '../veramo/setup';
import { AgentController } from './AgentController';
import verifiableRegistry from '../../verifiableRegistry.json';
import { validateSchemaWithURL } from '../utils/schemaValidation';
import { computeYearsBetweenDates } from '../utils/dateUtils';

/**
 * expected interface of a message containing a VC
 */
interface IVCMessageData {
	vc: {
		'@context': [string, string]
		type: [string, string]
		credentialSubject: {
			person: {
				dateOfBirth: string
			}
		}
	}
	sub: string
	nbf: number
	iss: string
}

/**
 * all possible issuers in the verifiable data registry
 */
enum issuers {
	nav = 'nav',
	symfoni = 'symfoni',
	state = 'state'
}

export class NAVAgentController extends AgentController {
	constructor(mainIdentifierAlias: string) {
		super(agentNAV, mainIdentifierAlias);
	}

	async isQualifiedForUnemploymentBenefits(presentationToken: string): Promise<boolean | Error> {
		try {
			let isVerifiedPersonVC = false;
			let isVerifiedEmploymentVC = false;
			let isVerifiedTerminationVC = false;

			// handle message with token
			const handledMessage: any = await this.agent.handleMessage({
				raw: presentationToken
			});
	
			// get array of credential tokens
			const credentials = handledMessage.credentials;

			// handle each credential token
			for (let index = 0; index < credentials.length; index++) {
				
				// get credential message by handling credential token
				const credentialMessage: any = await this.agent.handleMessage({
					raw: credentials[index].proof.jwt
				});
				
				// get credential message data
				const credentialMessageData: IVCMessageData = credentialMessage.data;

				switch (credentialMessageData.vc.type.at(1)) {
				case TYPE_EMPLOYMENT_CREDENTIAL:
					if (
						! await this.verifySchema(credentialMessageData) || 
						! await this.verifyIssuer(credentialMessageData, issuers.symfoni)
					) {
						return false;
					}
					isVerifiedEmploymentVC = true;
					break;
					
				case TYPE_TERMINATION_CREDENTIAL:
					if (
						! await this.verifySchema(credentialMessageData) || 
						! await this.verifyIssuer(credentialMessageData, issuers.symfoni)
					) {
						return false;
					}
					isVerifiedTerminationVC = true;
					break;
				
				case TYPE_PERSON_CREDENTIAL:
					if (
						! await this.verifySchema(credentialMessageData) || 
						! await this.verifyIssuer(credentialMessageData, issuers.state) ||
						! this.verifyPersonVCData(credentialMessageData)
					) {
						return false;
					}
					isVerifiedPersonVC = true;
					break; 
				
				default:
					break;
				}
			}
			
			// if all necessary credential are verified, return true.
			if (isVerifiedEmploymentVC && isVerifiedTerminationVC && isVerifiedPersonVC) {
				return true;
			}

			return false;
		
		} catch (error) {
			console.error(error);
			return new Error('unable to qualify');
		}
	}

	/**
	 * verifyIssuer verifies if a credential is signed by a verified issuer.
	 * @param credentialMessageData the credential message with the issuer.
	 * @param issuer which issuer you expect.
	 * @returns true if the issuer you expect matches with the signer of the credential.
	 */
	private async verifyIssuer(credentialMessageData: IVCMessageData, issuer: issuers): Promise<boolean | Error>{
		try {
			// check if the credential issuer is who they say they are by looking at the verifiable data registry.
			if (!(credentialMessageData.iss === verifiableRegistry[issuer])) {
				return false;
			}	
			return true;
		} catch (error) {
			return new Error('something went wrong');
		}
	}

	/**
	 * verifySchema verifies a credentials subject data against its schema.
	 * @param credentialMessageData the credential message containing a schema and subject data.
	 * @returns true if the data matches the credential schema.
	 */
	private async verifySchema(credentialMessageData: IVCMessageData): Promise<boolean | Error> {

		try {
		// get schema url from message
			const schemaURL = credentialMessageData.vc['@context'][1];
		
			// get the credential subject object
			const credentialObject = credentialMessageData.vc.credentialSubject;
			
			// return false if the schema does not match the object
			if (!validateSchemaWithURL(schemaURL, credentialObject)) {
				return false;
			}
			
			return true;	
		} catch (error) {
			console.error(error);
			return new Error('unable to verify against schema');
		}
	}

	/**
	 * verifyPersonVCData checks if the data in the VC meets NAVs requirements for recieving unemployment benefits.
	 * @param credentialMessageData the credential message.
	 * @returns true if all requirements are met.
	 */
	private verifyPersonVCData(credentialMessageData: IVCMessageData): boolean | Error {
		try {
			// compute age of person
			const age = computeYearsBetweenDates(credentialMessageData.vc.credentialSubject.person.dateOfBirth, new Date().toISOString());
			if (age >= 67) {
				return false;
			}
			return true;
		} catch (error) {
			console.error(error);
			return new Error('unable to verify person data');
		}
	}
}