export type personVerifiableCredential = {
    '@context': [
        'https://www.w3.org/2018/credentials/v1', 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/tempJSON/businessSchema.json'
    ];
    type: ['VerifiableCredential', 'BusinessVC'];
    credentialSubject: {
        id: string,
        business: {
            name: string,
            industrialCode: string,
            organisationStructure: string,
            organisationNumber: number,
            address: {
                countryCode: string,
                city: string,
                zipCode: number,
                streetName: string,
                streetNumber: number,
                floor: string
            }
        }
    };
    issuer: {
        id: string;
    };
    expirationDate?: string;
}