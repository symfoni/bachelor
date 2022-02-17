// This type is under construction
export type employmentVC = {
    context: [
        string,
        string
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
                hasNotComitedGrossMisconduct: boolean,
                rightForPension: true,
                nonCompeteClause: false,
                requirementToWorkOverseas: true
            }
            employerId: string,
            PDFContract: {
                URL: string,
                hash: string
            }
        }
    };
    issuer?: {
        id: string;
    };
    issuanceDate?: string;
    expirationDate?: string;
    proof?: {
        type?: string;
        jwt: string;
    };
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