/**
 * A custom type for the core properties of a verifiable credential.
 */
export type verifiableCredential = {
    '@Context': string[],
    'type': [string, string],
    'credentialSubject': object,
    'issuer': string,
    'expirationDate'?: string
}