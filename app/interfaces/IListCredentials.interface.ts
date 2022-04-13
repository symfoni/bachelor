export interface IVerifiableCredentialDataStore {
    hash: string
    verifiableCredential: VerifiableCredential
  }
  
export interface VerifiableCredential {
    '@context': string[]
    type: string[]
    issuer: Issuer
    credentialSubject: CredentialSubject
    proof: Proof
    issuanceDate: string
  }
  
export interface Issuer {
    id: string
  }
  
export interface CredentialSubject {
    business?: Business
    id: string
    termination?: Termination
    person?: Person
    employment?: Employment
  }
  
export interface Business {
    name: string
    industrialCode: string
    organisationStructure: string
    organisationNumber: number
    address: Address
  }
  
export interface Address {
    countryCode: string
    city: string
    zipCode: number
    streetName: string
    streetNumber: number
    floor: string
  }
  
export interface Termination {
    employee: Employee
    contractPDF: ContractPdf
  }
  
export interface Employee {
    lastDayAtWork: string
    lastPayday: string
    terminationStatus: string
    terminatedDuringTrialPeriod: boolean
    WeeklyWorkHours: number
    terminationNoticeReceived: string
  }
  
export interface ContractPdf {
    URL: string
    hash: string
  }
  
export interface Person {
    dateOfDeath: string
    countryOfDeath: string
    placeOfDeath: string
    countryOfBirth: string
    placeOfBirth: string
    dateOfBirth: string
    gender: string
    name: Name
    originalName: string
    maritalStatus: string
    citizenship: string
    address: Address
  }
  
export interface Name {
    lastName: string
    firstName: string
    middleName: string
  }
  
export interface Address {
    countryCode: string
    city: string
    zipCode: number
    streetName: string
    streetNumber: number
  }
  
export interface Employment {
    employee: Employee
    contractPDF: ContractPdf
  }
  
export interface Employee2 {
    employeeId: string
    jobTitle: string
    placeOfWork: string
    hoursOfWork: number
    startDate: string
    endDate: string
    employmentStatus: EmploymentStatus
    salary: Salary
    trialPeriod: TrialPeriod
    rightForPension: boolean
    nonCompeteClause: boolean
    requirementToWorkOverseas: boolean
  }
  
export interface EmploymentStatus {
    employmentType: string
    partTimePercentage: number
  }
  
export interface Salary {
    monthlySalary: number
    workPercentage: number
    currency: string
  }
  
export interface TrialPeriod {
    startDate: string
    endDate: string
    trialPeriodTerminationNotice: number
  }
  
export interface ContractPdf2 {
    URL: string
    hash: string
  }
  
export interface Proof {
    type: string
    jwt: string
  }