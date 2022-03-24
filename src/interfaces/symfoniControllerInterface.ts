import { VerifiableCredential } from '@veramo/core';
import { employmentVC } from '../types/employmentVCType';
import { terminationVC } from '../types/terminationVCType';

export interface ISymfoniAgentController {
    createEmploymentCredential(issuer: string, credentialData: employmentVC['credentialSubject']): Promise<VerifiableCredential | Error>
    
    createTerminationCredential(issuer: string, credentialData: terminationVC['credentialSubject']): Promise<VerifiableCredential | Error>
}