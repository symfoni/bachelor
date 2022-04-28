import { IVCMessageData } from '../interfaces/message.interface';
import { validateSchemaWithURL } from './schemaValidation';
import verifiableRegistry from '../../verifiableRegistry.json';

/**
 * An enum of all the valid issuers. Used for looking up in the data registry.
 */
export enum issuers {
	nav = 'nav',
	symfoni = 'symfoni',
	state = 'state'
}

/**
	 * verifySchema verifies a credentials subject data against its schema.
	 * @param credentialMessageData the credential message containing a schema and subject data.
	 * @returns true if the data matches the credential schema.
	 */
export async function verifySchema(credentialMessageData: IVCMessageData): Promise<boolean | Error> {

	try {
		// get schema url from message
		const schemaURL = credentialMessageData.vc['@context'][1];
    
		// get the credential subject object
		const credentialObject = credentialMessageData.vc;
        
		// return false if the schema does not match the object
		if (! await validateSchemaWithURL(schemaURL, credentialObject)) {
			return false;
		}
        
		return true;	
	} catch (error) {
		console.error(error);
		return new Error('unable to verify against schema');
	}
}

/**
	 * verifyIssuer verifies if a credential is signed by a verified issuer.
	 * @param credentialMessageData the credential message with the issuer.
	 * @param issuer which issuer you expect.
	 * @returns true if the issuer you expect matches with the signer of the credential.
	 */
export async function verifyIssuer(credentialMessageData: IVCMessageData, issuer: issuers): Promise<boolean | Error>{
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