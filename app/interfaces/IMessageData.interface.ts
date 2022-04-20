import { VerifiableCredential } from '@veramo/core';

export interface IHandledMessage {
    handledMessage: HandledMessage;
}

export interface HandledMessage {
    raw:         string;
    metaData:    MetaDatum[];
    data:        Data;
    id:          string;
    type:        string;
    from:        string;
    to:          string;
    createdAt:   Date;
    credentials: VerifiableCredential[];
}

export interface Credential {
    credentialSubject: object;
    issuer:            Issuer;
    type:              string[];
    '@context':        string[];
    issuanceDate:      Date;
    proof:             Proof;
}


export interface Issuer {
    id: string;
}

export interface Proof {
    type: string;
    jwt:  string;
}

export interface Data {
    vc:  Vc;
    sub: string;
    nbf: number;
    iss: string;
}

export interface Vc {
    '@context':        string[];
    type:              string[];
    credentialSubject: object;
}

export interface MetaDatum {
    type:  string;
    value: string;
}
