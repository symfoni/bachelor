/**
 * A custom type for the core properties of a verifiable credential.
 */
export type verifiableCredential = {
    '@context': string[],
    'type': [string, string],
    'credentialSubject': object,
    'issuer': { id: string },
    'expirationDate'?: string
}