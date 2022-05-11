import { TYPE_EMPLOYMENT_CREDENTIAL, TYPE_PERSON_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL } from '../constants/verifiableCredentialConstants';
import { agentNAV } from '../veramo/veramo.setup';
import { AgentController } from './AgentController';
import { computeMonthsBetweenDates, computeYearsBetweenDates } from '../utils/dateUtils';
import { IVCMessageDataPerson, IVCMessageDataTermination } from '../interfaces/message.interface';
import { issuers, verifyIssuer, verifySchema } from '../utils/verifyPresentation';
import { INAVAgentController } from '../interfaces/navAgentController.interface';

/**
 * NAVAgentController handles the functionality of the NAV agent.
 */
export class NAVAgentController extends AgentController implements INAVAgentController {
	
	/**
	 * The constructor is used to set which agent the class should control
	 * and what the alias for the main identifier should be.
	 * @param mainIdentifierAlias the alias of the main identifier, defaults to 'nav'.
	 */
	constructor(mainIdentifierAlias = 'nav') {
		super(agentNAV, mainIdentifierAlias);
	}

	/**
	 * isQualifiedForUnemploymentBenefits takes a presentation token and checks if the VCs within the presenation
	 * token qualifies for unemployment benefits.
	 * @param presentationToken a presentation token containing multiple VCs.
	 * @returns a boolean stating whether the token qualifies or not.
	 */
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
				const credentialMessageData: any = credentialMessage.data;

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
						! await verifyIssuer(credentialMessageData, issuers.symfoni) ||
						! this.verifyTerminationVCData(credentialMessageData)
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
			return new Error('unable to verify person data');
		}
	}

	/**
	 * verifyTerminationVCData verifies the data within the termination contract credential.
	 * @param credentialMessageData the credential message.
	 * @returns true if all requirements are met.
	 */
	private verifyTerminationVCData(credentialMessageData: IVCMessageDataTermination): boolean | Error {
		try {
			const todaysDate = new Date().toISOString();

			const lastPayDay = credentialMessageData.vc.credentialSubject.termination.employee.lastPayday;

			const years = computeYearsBetweenDates(lastPayDay, todaysDate);
			const months = computeMonthsBetweenDates(lastPayDay, todaysDate);

			// if years is more than one, or months is less than three, return false
			if (years > 1 || months < 3) {
				return false;
			}
		
			return true;
		
		} catch (error) {
			return new Error('unable to verify the termination contract data');
		}
	}
}