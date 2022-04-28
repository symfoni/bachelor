import { DIDResolutionResult, IIdentifier, VerifiableCredential, VerifiablePresentation } from '@veramo/core';
import { UniqueVerifiableCredential } from '@veramo/data-store';

/**
 * IAgentController is an interface for the AgentController class.
 */
export interface IAgentController {
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

    addServiceKeyToDid(): Promise<void | Error>

    addPostMessagingServiceToDid(messagingServiceEndpoint: string): Promise<void | Error>

    addDIDCommMessagingServiceToDid(messagingServiceEndpoint: string): Promise<void | Error>

    sendMessage(toDid: string, type: string, messageData: object, fromDid?: string): Promise<void | Error>
}