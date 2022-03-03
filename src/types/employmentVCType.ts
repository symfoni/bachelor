export type employmentVC = {
    '@context': [
        'https://www.w3.org/2018/credentials/v1', 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/employmentContractSchema.json'
    ];
    type: ['VerifiableCredential', 'EmploymentVC'];
    credentialSubject: {
        employment: {
            employee: {
                employeeId: string,
                jobTitle: string,
                placeofWork: string,
                hoursOfWork: number,
                startDate: string,
                endDate: string,
                employmentStatus: {
                    employmentType: employmentType,
                    partTimePercentage: number
                }
                salary: {
                    frequency: salaryFrequency,
                    amount: number,
                    currency: string
                }
                trialPeriod: {
                    startDate: string,
                    endDate: string
                }
                rightForPension: boolean,
                nonCompeteClause: boolean,
                requirementToWorkOverseas: boolean
            }
            employerId: string,
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
};

export enum employmentType {
    FULL_TIME = 'full time',
    PART_TIME = 'part time',
    FREELANCE = 'freelance'
}

export enum salaryFrequency {
    MONTHLY = 'monthly',
    WEEKLY = 'weekly',
    DAILY = 'daily'
}