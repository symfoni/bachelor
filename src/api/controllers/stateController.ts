import { VerifiableCredential } from '@veramo/core';
import { Request, Response } from 'express';
import { StateAgentController } from '../../controllers/StateAgentController';
import { dbAddPersonData, dbDeletePersonData, dbGetPersonData } from '../../firestore/stateOperations';
import { businessVerifiableCredential } from '../../types/businessVCtype';
import { personVerifiableCredential } from '../../types/personVCType';
import { hashString } from '../../utils/encryption';
import { validateSchema } from '../../utils/schemaValidation';

const PERSON_VC_SCHEMA_FILE_PATH = 'schemas/tempJSON/personSchema.json';
const BUSINESS_VC_SCHEMA_FILE_PATH = 'schemas/tempJSON/businessSchema.json';
const stateAgentController = new StateAgentController('state');

const createPersonCredential = async (req: Request, res: Response) => {
	let issuer: string = req.body.issuer;


	const validationResult = validateSchema(PERSON_VC_SCHEMA_FILE_PATH, req.body);

	if (validationResult !== true) {
		return res.status(400).json({
			error: 'unable to create VC',
			errorMessage: validationResult
		});
	}

	const credentialSubject: personVerifiableCredential['credentialSubject'] = req.body.credentialSubject;

	// TODO: Possibly make this if statement a utility function as it used many times.
	if (typeof issuer === 'undefined') {
		await stateAgentController.getMainIdentifier().then((identifier) => {
			if (identifier instanceof Error) {
				return res.status(500).json({
					error: identifier.message
				});
			}
			issuer = identifier.did;
		});
	}

	await stateAgentController.createPersonCredential(issuer, credentialSubject).then((credential) => {
		// TODO: Validate against context schema
		if (typeof credential === 'string') {
			return res.status(400).json({
				error: credential
			});
		}
		return res.status(201).json({
			credential
		});
	});
};

// create business credential
const createBusinessCredential = async (req: Request, res: Response) => {
	let issuer: string = req.body.issuer;

	const validationResult = validateSchema(BUSINESS_VC_SCHEMA_FILE_PATH, req.body);

	if (validationResult !== true) {
		return res.status(400).json({
			error: 'unable to create VC',
			errorMessage: validationResult
		});
	}

	const credentialSubject: businessVerifiableCredential['credentialSubject'] = req.body.credentialSubject;

	// TODO: Possibly make this if statement a utility function as it used many times.
	if (typeof issuer === 'undefined') {
		await stateAgentController.getMainIdentifier().then((identifier) => {
			if (identifier instanceof Error) {
				return res.status(500).json({
					error: identifier.message
				});
			}
			issuer = identifier.did;
		});
	}

	await stateAgentController.createBusinessCredential(issuer, credentialSubject).then((credential) => {
		// TODO: Validate against context schema
		if (typeof credential === 'string') {
			return res.status(400).json({
				error: credential
			});
		}
		return res.status(201).json({
			credential
		});
	});
};

// creates a DID
const createDID = async (req: Request, res: Response) => {
	const alias: string = req.body.alias;
	const provider: string = req.body.provider;
	const kms: string = req.body.kms;

	await stateAgentController.createDID(alias, provider, kms).then((did) => {
		if (did instanceof Error) {
			return res.status(400).json({
				error: did.message
			});
		}
		return res.status(201).json({
			did
		});
	});
};

// get a specific did
const getDID = async (req: Request, res: Response) => {
	const did: string = req.params.did;
	await stateAgentController.getDID(did).then((identifier) => {
		if (identifier instanceof Error) {
			return res.status(400).json({
				error: identifier.message
			});
		}
		return res.status(200).json({
			identifier
		});
	});
};

// list dids
const listDIDs = async (req: Request, res: Response) => {
	await stateAgentController.listAllDIDs().then((didList) => {
		if (typeof didList === 'undefined') {
			return res.status(500).json({
				error: 'unable to retrieve a list of dids'
			});
		}
		return res.status(200).json({
			listOfDids: didList
		});
	});
};

// resolves a did
const resolveDID = async (req: Request, res: Response) => {
	const did: string = req.params.did;
	stateAgentController.resolveDID(did).then((didDocument) => {
		if (didDocument instanceof Error) {
			return res.status(400).json({
				error: didDocument.message
			});
		} else if (typeof didDocument.didDocument?.id === 'undefined') {
			return res.status(400).json({
				didDocument
			});
		}
		return res.status(200).json({
			didDocument
		});
	});
};

// save a credential
const addCredential = async (req: Request, res: Response) => {
	if (typeof req.body.credential === 'undefined') {
		return res.status(400).json({
			error: 'no credential object found, make sure that the verifiable credential is wrapped in a credential object.'
		});
	}

	const credential: VerifiableCredential = {
		'@context': req.body.credential['@context'],
		type: req.body.credential.type,
		issuer: {
			id: req.body.credential.issuer.id
		},
		credentialSubject: req.body.credential.credentialSubject,
		proof: req.body.credential.proof,
		issuanceDate: req.body.credential.issuanceDate
	};

	await stateAgentController.addCredential(credential).then((credentialHash) => {
		return res.status(201).json({
			credentialHash
		});
	});

};

// list all saved credentials in the database
const listCredentials = async (req: Request, res: Response) => {
	await stateAgentController.getAllCredentials().then((credentialList) => {
		if (credentialList.length === 0) {
			return res.status(400).json({
				error: 'no credentials found'
			});
		}
		return res.status(200).json({
			listOfCredentials: credentialList
		});
	});
};

// retrieve credential(s) based on type
const getCredential = async (req: Request, res: Response) => {
	const credentialType: string = req.params.type;
	await stateAgentController.getCredentialBasedOnType(credentialType).then((credentialList) => {
		if (credentialList.length === 0) {
			return res.status(400).json({
				error: 'no credentials found for that type'
			});
		}
		return res.status(200).json({
			listOfCredentials: credentialList
		});
	});
};

// verify a jwt
const verifyJWT = async (req: Request, res: Response) => {
	const jwt: string = req.body.jwt;

	if (typeof jwt === 'undefined') {
		return res.status(400).json({
			error: 'jwt missing'
		});
	}

	await stateAgentController.verifyJWT(jwt).then((isValid) => {
		if (isValid instanceof Error) {
			return res.status(500).json({
				fatal_error: isValid.message
			});
		}
		return res.status(200).json({
			isValid
		});
	});
};

// create presentation
const createPresentation = async (req: Request, res: Response) => {
	const credentials: VerifiableCredential[] = [];
	let holder: string = req.body.holder;

	// TODO: Add a typeguard that returns an error if credentials is not of type VC[]

	// if holder is not specified, use default DID
	if (typeof holder === 'undefined') {
		await stateAgentController.getMainIdentifier().then((mainIdentifier) => {

			if (mainIdentifier instanceof Error) {
				return res.status(500).json({
					fatal_error: mainIdentifier.message
				});
			}

			holder = mainIdentifier.did;
		});
	}

	if (req.body.listOfCredentials.length === 0) {
		return res.status(400).json({
			error: 'empty list of credentials'
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	req.body.listOfCredentials.forEach((credential: any) => {
		credentials.push(credential['verifiableCredential']);
	});

	await stateAgentController.createPresentation(holder, credentials).then((presentation) => {
		if (presentation instanceof Error) {
			return res.status(400).json({
				error: presentation.message
			});
		}
		return res.status(201).json({
			presentation
		});
	});

};

// adds person data to the database
const addPersonDataToDb = async (req: Request, res: Response) => {
	// check if id is missing
	if (typeof req.body.id === 'undefined') {
		return res.status(400).json({
			error: 'id is missing'
		});
	}

	// check if credential subject data is missing
	if (typeof req.body.credentialSubject === 'undefined') {
		return res.status(400).json({
			error: 'credential subject data is missing'
		});
	}
	
	const validationResult = validateSchema(PERSON_VC_SCHEMA_FILE_PATH, req.body);

	// validate against schema
	if(validationResult !== true){
		return res.status(400).json({
			error: 'object does not match the required schema',
			errorMessage: validationResult
		});
	}

	const id: string = req.body.id;
	const personData: object = req.body.credentialSubject;

	// hash SSN
	const hashedId = hashString(id);

	const document = dbAddPersonData(hashedId, personData);
	if (document instanceof Error) {
		return res.status(500).json({
			error: 'could not add to database'
		});
	}

	return res.status(201).json({
		id: hashedId,
		documentData: personData
	});
};

// retrieves person data from the database
const getPersonDataFromDb = async (req: Request, res: Response) => {
	if (typeof req.params.id === 'undefined') {
		return res.status(400).json({
			error: 'id is missing'
		});
	}

	const id: string = req.params.id;
	const hashedId = hashString(id);

	const personData = await dbGetPersonData(hashedId);

	if (personData instanceof Error) {
		return res.status(500).json({
			error: 'could not retrieve from database'
		});
	}

	if (typeof personData === 'undefined') {
		return res.status(400).json({
			error: 'no document matching the id'
		});
	}

	return res.status(200).json({
		personData
	});
};

// deletes person data from the database
const deletePersonDataFromDb = async (req: Request, res: Response) => {
	if (typeof req.params.id === 'undefined') {
		return res.status(400).json({
			error: 'id is missing'
		});
	}

	const id: string = req.params.id;
	const hashedId = hashString(id);

	const personData = await dbDeletePersonData(hashedId);

	if (personData instanceof Error) {
		return res.status(500).json({
			error: 'could not delete from database'
		});
	}

	if (typeof personData === 'undefined') {
		return res.status(400).json({
			error: 'no document matching the id'
		});
	}

	return res.status(200).json({
		success: 'successfully deleted from the database',
		personData
	});
};

// sends a message from the state agent
const sendMessage = async (req: Request, res: Response) => {
	try {
		// get params from body
		const toDid: string = req.body.toDid;
		const mainIdentifier = await stateAgentController.getMainIdentifier();

		if (mainIdentifier instanceof Error) {
			return res.status(500).json({
				error: mainIdentifier.message
			});
		}

		const fromDid: string = mainIdentifier.did;
		const type = req.body.type;
		const message = req.body.message;

		// use params to send message
		const sentMessage = await stateAgentController.sendMessage(toDid, type, message, fromDid);

		if (sentMessage instanceof Error) {
			return res.status(500).json({
				error: 'unable to send message'
			});
		}

		return res.status(200).json({
			success: 'message sent'
		});
	// return positive / negative feedback
	} catch (error) {
		return res.status(400).json({
			error: 'could not send message'
		});
	}
};

export default { 
	createPersonCredential,
	createBusinessCredential, 
	createDID, 
	listDIDs, 
	resolveDID, 
	getDID, 
	addCredential, 
	listCredentials, 
	getCredential, 
	createPresentation, 
	verifyJWT,
	addPersonDataToDb,
	getPersonDataFromDb,
	deletePersonDataFromDb,
	sendMessage
};