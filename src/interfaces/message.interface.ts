export interface IVCMessageData {
	vc: {
		'@context': [string, string]
		type: [string, string]
		credentialSubject: object
	}
	sub: string
	nbf: number
	iss: string
}

export interface IVCMessageDataPerson {
	vc: {
		'@context': [string, string]
		type: [string, string]
		credentialSubject: {
            person: {
                dateOfBirth: string
            }
        }
	}
	sub: string
	nbf: number
	iss: string
}

export interface IVCMessageDataTermination {
	vc: {
		'@context': [string, string]
		type: [string, string]
		credentialSubject: {
            termination: {
                employee: {
					lastPayday: string
				}
            }
        }
	}
	sub: string
	nbf: number
	iss: string
}