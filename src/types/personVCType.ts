/**
 * personVerifiableCredential describes the content of a person verifiable credential.
 */
export type personVerifiableCredential = {
    '@context': [
        'https://www.w3.org/2018/credentials/v1', 'https://github.com/symfoni/bachelor/blob/dev/schemas/tempJSON/personSchema.json'
    ];
    type: ['VerifiableCredential', 'PersonVC'];
    credentialSubject: {
        id: string,
        person: {
            dateOfDeath?: string,
            countryOfDeath?: string,
            placeOfDeath?: string,
            countryOfBirth: string,
            placeOfBirth: string,
            dateOfBirth: string,
            gender: gender,
            name: {
                lastName: string,
                firstName: string,
                middleName: string
            },
            originalName: string,
            maritalStatus: maritalStatus,
            citizenship: string,
            address: {
                countryCode: string,
                city: string,
                zipCode: string,
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

export enum gender {
    MALE = 'male',
    FEMALE = 'female',
    UNDEFINED = 'undefined'
}

export enum maritalStatus {
    WIDOWER = 'widower',
    WIDOW = 'widow',
    MARRIED = 'married',
    SURVIVING_PARTNER = 'surviving partner',
    REGISTERED_PARTNER = 'registered partner',
    SEPERATED = 'seperated',
    SEPERATED_PARTNER = 'seperated partner',
    DIVORCED = 'divorced',
    DIVORCED_PARTNER = 'divorced partner',
    UNMARRIED = 'unmarried',
    UNKNOWN = 'unknown',
    UNDEFINED = 'undefined'
}