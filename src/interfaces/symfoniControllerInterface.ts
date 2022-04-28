import { VerifiableCredential } from '@veramo/core';
import { employmentVC } from '../types/employmentVCType';
import { terminationVC } from '../types/terminationVCType';

/**
 * ISymfoniAgentController is an interface for the functions within the SymfoniAgentController class.
 */
export interface ISymfoniAgentController {
    createEmploymentCredential(issuer: string, credentialData: employmentVC['credentialSubject']): Promise<VerifiableCredential | Error>
    
    createTerminationCredential(issuer: string, credentialData: terminationVC['credentialSubject']): Promise<VerifiableCredential | Error>

    isQualifiedForContractVCs(presentationToken: string): Promise<boolean | Error>
}