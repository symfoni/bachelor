import { TYPE_EMPLOYMENT_CREDENTIAL, TYPE_PERSON_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { agentNAV } from '../veramo/setup';
import { AgentController } from './AgentController';
import { computeYearsBetweenDates } from '../utils/dateUtils';
import { IVCMessageDataPerson } from '../interfaces/messages.interface';
import { issuers, verifyIssuer, verifySchema } from '../utils/verifyPresentation';

/**
 * NAVAgentController handles the functionality of the NAV agent.
 */
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
				const credentialMessageData: IVCMessageDataPerson = credentialMessage.data;

				switch (credentialMessageData.vc.type.at(1)) {
				case TYPE_EMPLOYMENT_CREDENTIAL:
					if (
						! await verifySchema(credentialMessageData) || 
						! await verifyIssuer(credentialMessageData, issuers.symfoni)
					) {
						return false;
					}
					isVerifiedEmploymentVC = true;
					break;
					
				case TYPE_TERMINATION_CREDENTIAL:
					if (
						! await verifySchema(credentialMessageData) || 
						! await verifyIssuer(credentialMessageData, issuers.symfoni)
					) {
						return false;
					}
					isVerifiedTerminationVC = true;
					break;
				
				case TYPE_PERSON_CREDENTIAL:
					if (
						! await verifySchema(credentialMessageData) || 
						! await verifyIssuer(credentialMessageData, issuers.state) ||
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
	 * verifyPersonVCData checks if the data in the VC meets NAVs requirements for recieving unemployment benefits.
	 * @param credentialMessageData the credential message.
	 * @returns true if all requirements are met.
	 */
	private verifyPersonVCData(credentialMessageData: IVCMessageDataPerson): boolean | Error {
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