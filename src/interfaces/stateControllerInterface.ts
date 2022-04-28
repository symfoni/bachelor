import { VerifiableCredential } from '@veramo/core';
import { businessVerifiableCredential } from '../types/businessVCtype';
import { personVerifiableCredential } from '../types/personVCType';
/**
 * IStateAgentController is an interface for the functions within the StateAgentController class.
 */
export interface IStateAgentController {
    createPersonCredential(issuerDid: string, credentialSubjectData: personVerifiableCredential['credentialSubject']): Promise<VerifiableCredential | Error>
    
    createBusinessCredential(issuerDid: string, credentialSubjectData: businessVerifiableCredential['credentialSubject']): Promise<VerifiableCredential | Error>
}