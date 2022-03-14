export type terminationVC = {
    '@context': [
        'https://www.w3.org/2018/credentials/v1', 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/terminationSchema.json'
    ];
    type: ['VerifiableCredential', 'TerminationVC'];
    credentialSubject: {
        id: string,
        termination: {
            employee: {
                lastDayAtWork: string,
                lastPayDay: string,
                terminationStatus: terminationStatus,
                terminatedDuringTrialPeriod: boolean,
                weeklyWorkHours: number,

            },
            contractPDF: {
                URL: string,
                hash: string
            }
        }
    };
    issuer: {
        id: string;
    };
    expirationDate?: string;
}

export enum terminationStatus {
    RESIGNED = 'resigned',
    FIRED = 'fired',
    BANKRUPTCY = 'bankruptcy'
}