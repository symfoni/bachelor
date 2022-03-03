/**
 * A simple interface for the AgentController class
 */
export interface IAgentController {
    // TODO: Fix return type any to actually be of type did, 'did[]', etc.
    getDID(did: string): any

    createDID(alias?: string, provider?: string, keyManagementSystem?: string): any

    listAllDIDs(): any

    listDIDsBasedOnProvider(provider: string): any

    listDIDsBasedOnAlias(alias: string): any

    resolveDID(didUrl: string): any
}