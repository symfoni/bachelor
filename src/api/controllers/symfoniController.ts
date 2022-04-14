import { VerifiableCredential } from '@veramo/core';
import { Request, Response } from 'express';
import { SymfoniAgentController } from '../../controllers/SymfoniAgentController';
import { 
	dbAddEmploymentContract, 
	dbAddTerminationContract, 
	dbDeleteEmploymentContract, 
	dbDeleteTerminationContract, 
	dbGetEmploymentContract, 
	dbGetTerminationContract 
} from '../../firestore/symfoniOperations';
import { employmentVC } from '../../types/employmentVCType';
import { terminationVC } from '../../types/terminationVCType';
import { hashString } from '../../utils/encryption';
import { validateSchema } from '../../utils/schemaValidation';
import { agentSymfoni } from '../../veramo/setup';

const TERMINATION_VC_SCHEMA_FILE_PATH = 'schemas/terminationSchema.json';
const EMPLOYMENT_VC_SCHEMA_FILE_PATH = 'schemas/employmentSchema.json';
const symfoniAgentController = new SymfoniAgentController('symfoni');

// creates employment credential
const createEmploymentCredential = async (req: Request, res: Response) => {
	// read json input
	let issuer: string = req.body.issuer;

	const validationResult = validateSchema(EMPLOYMENT_VC_SCHEMA_FILE_PATH, req.body);

	if(validationResult !== true){
		return res.status(400).json({
			error: 'unable to create VC',
			errorMessage: validationResult
		});
	}

	const credentialClaims: employmentVC['credentialSubject'] = req.body.credentialSubject;

	if (typeof issuer === 'undefined') {
		await symfoniAgentController.getMainIdentifier().then((identifier) => {
			if (identifier instanceof Error) {
				return res.status(500).json({
					error: 'unable to retrieve main identifier'
				});
			}
			issuer = identifier.did;
		});
	}

	// make credential based on json input

	await symfoniAgentController.createEmploymentCredential(issuer, credentialClaims).then((credential) => {
		// TODO: Validate credential against schema
		if (typeof credential === 'string') {
			return res.status(400).json({
				error: credential
			});
		}
		return res.status(201).json({ credential });
	});
};

// create termination credential
const createTerminationCredential = async (req: Request, res: Response) => {
	let issuer: string = req.body.issuer;
	
	const validationResult = validateSchema(TERMINATION_VC_SCHEMA_FILE_PATH, req.body);

	if(validationResult !== true){
		return res.status(400).json({
			error: 'unable to create VC',
			errorMessage: validationResult
		});
	}

	const credentialClaims: terminationVC['credentialSubject'] = req.body.credentialSubject;

	if (typeof issuer === 'undefined') {
		await symfoniAgentController.getMainIdentifier().then((identifier) => {
			if (identifier instanceof Error) {
				return res.status(500).json({
					error: 'unable to retrieve main identifier'
				});
			}
			issuer = identifier.did;
		});
	}

	await symfoniAgentController.createTerminationCredential(issuer, credentialClaims).then((credential) => {
		// TODO: Validate credential against context schema
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

	await symfoniAgentController.createDID(alias, provider, kms).then((did) => {
		if (typeof did === 'string') {
			return res.status(400).json({
				error: did
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
	await symfoniAgentController.getDID(did).then((identifier) => {
		if (typeof identifier === 'string') {
			return res.status(400).json({
				error: identifier
			});
		}
		return res.status(200).json({
			identifier
		});
	});
};

// list dids
const listDIDs = async (req: Request, res: Response) => {
	await symfoniAgentController.listAllDIDs().then((didList) => {
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
	symfoniAgentController.resolveDID(did).then((didDocument) => {
		if (didDocument instanceof Error) {
			return res.status(400).json({
				error: didDocument
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

	await symfoniAgentController.addCredential(credential).then((credentialHash) => {
		return res.status(201).json({
			credentialHash
		});
	});

};

// list all saved credentials in the database
const listCredentials = async (req: Request, res: Response) => {
	await symfoniAgentController.getAllCredentials().then((credentialList) => {
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
	await symfoniAgentController.getCredentialBasedOnType(credentialType).then((credentialList) => {
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

	if(typeof jwt === 'undefined') {
		return res.status(400).json({
			error: 'jwt missing'
		});
	}

	await symfoniAgentController.verifyJWT(jwt).then((isValid) => {
		if(isValid instanceof Error ) {
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
		await symfoniAgentController.getMainIdentifier().then((mainIdentifier)=>{
			
			if (mainIdentifier instanceof Error) {
				return res.status(500).json({
					fatal_error: 'unable to find or create the main identifier'
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
    
	await symfoniAgentController.createPresentation(holder, credentials).then((presentation) => {
		if (typeof presentation === 'string') {
			return res.status(400).json({
				error: presentation
			});
		}
		return res.status(201).json({
			presentation
		});
	});

};

// adds an employment contract to the database
const addEmploymentContractToDb = async (req: Request, res: Response) => {
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
	
	const validationResult = validateSchema(EMPLOYMENT_VC_SCHEMA_FILE_PATH, req.body);

	// validate against schema
	if(validationResult !== true){
		return res.status(400).json({
			error: 'object does not match the required schema',
			errorMessage: validationResult
		});
	}

	// recieve credential subject object with SSN
	const id: string = req.body.id;
	const employmentData: employmentVC['credentialSubject'] = req.body.credentialSubject;

	// hash SSN
	const hashedId = hashString(id);

	// use db function to store credential in database with SSN as key
	const document = dbAddEmploymentContract(hashedId, employmentData);
	if (document instanceof Error) {
		return res.status(500).json({
			error: 'could not add to database'
		});
	}

	return res.status(201).json({
		id: hashedId,
		documentData: employmentData
	});
};

// adds an termination contract to the database
const addTerminationContractToDb = async (req: Request, res: Response) => {
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
	
	const validationResult = validateSchema(TERMINATION_VC_SCHEMA_FILE_PATH, req.body);

	// validate against schema
	if(validationResult !== true){
		return res.status(400).json({
			error: 'object does not match the required schema',
			errorMessage: validationResult
		});
	}

	// recieve credential subject object with SSN
	const id: string = req.body.id;
	const terminationData: terminationVC['credentialSubject'] = req.body.credentialSubject;

	// hash SSN
	const hashedId = hashString(id);

	// use db function to store credential in database with SSN as key
	const document = dbAddTerminationContract(hashedId, terminationData);
	if (document instanceof Error) {
		return res.status(500).json({
			error: 'could not add to database'
		});
	}

	return res.status(201).json({
		id: hashedId,
		documentData: terminationData
	});
};

// retrieves an employment document from the database
const getEmploymentContract =async (req: Request, res: Response) => {
	if (typeof req.params.id === 'undefined') {
		return res.status(400).json({
			error: 'id is missing'
		});
	}

	const id: string = req.params.id;
	const hashedId = hashString(id);

	const employmentContractDocument = await dbGetEmploymentContract(hashedId);

	if (employmentContractDocument instanceof Error) {
		return res.status(500).json({
			error: 'could not retrieve from database'
		});
	}

	if (typeof employmentContractDocument === 'undefined') {
		return res.status(400).json({
			error: 'no document matching the id'
		});
	}

	return res.status(200).json({
		employmentContractDocument
	});
};

// retrieves a termination document from the database
const getTerminationContract =async (req: Request, res: Response) => {
	if (typeof req.params.id === 'undefined') {
		return res.status(400).json({
			error: 'id is missing'
		});
	}

	const id: string = req.params.id;
	const hashedId = hashString(id);

	const terminationContractDocument = await dbGetTerminationContract(hashedId);

	if (terminationContractDocument instanceof Error) {
		return res.status(500).json({
			error: 'could not retrieve from database'
		});
	}

	if (typeof terminationContractDocument === 'undefined') {
		return res.status(400).json({
			error: 'no document matching the id'
		});
	}

	return res.status(200).json({
		terminationContractDocument
	});
};

// deletes employment contract from the database
const deleteEmploymentContractFromDb = async (req: Request, res: Response) => {
	if (typeof req.params.id === 'undefined') {
		return res.status(400).json({
			error: 'id is missing'
		});
	}

	const id: string = req.params.id;
	const hashedId = hashString(id);

	const personData = await dbDeleteEmploymentContract(hashedId);

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

// deletes termination contract from the database
const deleteTerminationContractFromDb = async (req: Request, res: Response) => {
	if (typeof req.params.id === 'undefined') {
		return res.status(400).json({
			error: 'id is missing'
		});
	}

	const id: string = req.params.id;
	const hashedId = hashString(id);

	const personData = await dbDeleteTerminationContract(hashedId);

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

// Returns the main identifier of the did
const getMainIdentifier = async (req: Request, res: Response) => {
	const mainIdentifier = await symfoniAgentController.getMainIdentifier();
	if (mainIdentifier instanceof Error) {
		return res.status(500).json({
			error: mainIdentifier.message
		});
	}

	return res.status(200).json({
		mainIdentifier
	});
};

// handles symfonis incoming messages
const handleMessaging = async (req: Request, res: Response) => {
	// handle incoming message to retrieve the token from the encrypted message body
	const message = await agentSymfoni.handleMessage({
		raw: req.body as string,
		metaData: [{type: 'message'}],
		save: false
	});

	const messagePresentationToken = message.data.messageData;
	const senderDid = message.from;

	// check if the presentation token qualifies for unemployment benefits
	const isQualified = await symfoniAgentController.isQualifiedForContractVCs(messagePresentationToken);

	console.log(isQualified);
	console.log(senderDid);

	if (isQualified) {
		// find ssn in message

		// query for ssn in database (1 for termination and 1 for employment) -- database query

		// construct object that can be passed into the symfoni create employment vc and termination vc

		// pack VCs in a message and send it back to the user.


		await symfoniAgentController.sendMessage(senderDid, 'You get all the contracts', {result: 'take the contracts'});
		return res.status(200).json({
			success: 'donediddlie did it '
		});
	}
	
	await symfoniAgentController.sendMessage(senderDid, 'no contract for you', {result: 'no contracts'});

	if (message) {
		return res.json({ id: message });
	}
    
	return res.status(400).json({ Error: 'Failed' });
};

export default { 
	createEmploymentCredential,
	createTerminationCredential, 
	createDID, 
	listDIDs, 
	resolveDID, 
	getDID, 
	addCredential, 
	listCredentials, 
	getCredential, 
	createPresentation, 
	verifyJWT, 
	addEmploymentContractToDb, 
	getEmploymentContract,
	addTerminationContractToDb,
	getTerminationContract,
	deleteEmploymentContractFromDb,
	deleteTerminationContractFromDb,
	getMainIdentifier,
	handleMessaging
};