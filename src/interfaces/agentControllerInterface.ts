import { DIDResolutionResult, IIdentifier, VerifiableCredential, VerifiablePresentation } from '@veramo/core';
import { UniqueVerifiableCredential } from '@veramo/data-store';

/**
 * A simple interface for the AgentController class
 */
export interface IAgentController {
    // TODO: Fix return type any to actually be of type did, 'did[]', etc.
    getDID(did: string): Promise<IIdentifier | Error>

    createDID(alias?: string, provider?: string, keyManagementSystem?: string): Promise<IIdentifier | Error>

    listAllDIDs(): Promise<IIdentifier[]>

    listDIDsBasedOnProvider(provider: string): Promise<IIdentifier[] | Error>

    listDIDsBasedOnAlias(alias: string): Promise<IIdentifier[] | Error>

    resolveDID(didUrl: string): Promise<DIDResolutionResult | Error>

    createCredential(credentialData: VerifiableCredential): Promise<VerifiableCredential | Error>

    addCredential(credential: VerifiableCredential): Promise<string | Error>

    getAllCredentials(): Promise<UniqueVerifiableCredential[]>

    createPresentation(holder:string,credentials: VerifiableCredential[]): Promise<VerifiablePresentation | Error>
}