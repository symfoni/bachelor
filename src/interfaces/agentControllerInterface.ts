import { DIDResolutionResult, IIdentifier, VerifiableCredential, VerifiablePresentation } from '@veramo/core';
import { UniqueVerifiableCredential } from '@veramo/data-store';

/**
 * A simple interface for the AgentController class
 */
export interface IAgentController {
    // TODO: Fix return type any to actually be of type did, 'did[]', etc.
    getDID(did: string): Promise<IIdentifier | string>

    createDID(alias?: string, provider?: string, keyManagementSystem?: string): Promise<IIdentifier | string>

    listAllDIDs(): Promise<IIdentifier[]>

    listDIDsBasedOnProvider(provider: string): Promise<IIdentifier[] | string>

    listDIDsBasedOnAlias(alias: string): Promise<IIdentifier[] | string>

    resolveDID(didUrl: string): Promise<DIDResolutionResult | string>

    createCredential(credentialData: VerifiableCredential): Promise<VerifiableCredential | string>

    addCredential(credential: VerifiableCredential): Promise<string | Error>

    getAllCredentials(): Promise<UniqueVerifiableCredential[]>

    createPresentation(holder:string,credentials: VerifiableCredential[]): Promise<VerifiablePresentation | string>
}