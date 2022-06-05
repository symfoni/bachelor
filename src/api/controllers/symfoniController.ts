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
import { agentSymfoni } from '../../veramo/veramo.setup';

const TERMINATION_VC_SCHEMA_FILE_PATH = 'schemas/terminationSchema.json';
const EMPLOYMENT_VC_SCHEMA_FILE_PATH = 'schemas/employmentSchema.json';
const symfoniAgentController = new SymfoniAgentController('symfoni');

/**
 * createEmploymentCredential creates a verifiable credential of an employment contract.
 * @param req takes a request body in form of a JSON with the issuer DID, and the credential subject.
 * @param res responds with the created verifiable credential as JSON.
 */
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

/**
 * createTerminationCredential creates a verifiable credential of a termination contract.
 * @param req takes a request body in form of a JSON with the issuer DID, and the credential subject.
 * @param res responds with the created verifiable credential as JSON.
 */
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

/**
 * createDID creates a DID based on the request body parameters.
 * @param req the request has a body defining the alias, promivder, and key management.
 * @param res responds with json data containing the DID that was created, or an error if it was unable to create
 * a DID.
 */
const createDID = async (req: Request, res: Response) => {
	const alias: string = req.body.alias;
	const provider: string = req.body.provider;
	const kms: string = req.body.kms;

	await symfoniAgentController.createDID(alias, provider, kms).then((did) => {
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

/**
 * getDID retrieves a specific DID from the local database based on the DIDs ID.
 * @param req the request contains a parameter with the DID address to look for.
 * @param res responds with json data containing the DID, or an error message if no DID was found.
 */
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

/**
 * listDIDs lists all the DIDs managed by the agent.
 * @param req takes no request.
 * @param res respinds with a list of DIDs in JSON format, or an error if it was unable to look up the database.
 */
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

/**
 * resolveDID resolves a specific DID on the blockchain.
 * @param req takes a request containing one parameter, the DID address you want to resolve.
 * @param res responds with the DID-document in a JSON format.
 */
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

/**
 * addCredential saves a credential to the local database.
 * @param req takes a request body in a JSON format consisting of a verifiable credential.
 * @param res responds with the hash of the credential that was added to the database.
 */
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

/**
 * listCredentials lists all the credentials in the local database.
 * @param req takes no request.
 * @param res responds with a list of verifiable credentials in a JSON format.
 */
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

/**
 * getCredential retrieves redentials based on type.
 * @param req take one parameter which is the type of credential.
 * @param res responds with verifiable credentials in a JSON format.
 */
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

/**
 * verifyJWT checks if a JWT is valid.
 * @param req takes a request with a JSON body consisting of a JWT.
 * @param res responds with a boolean stating whether the JWT is valid or not.
 */
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

/**
 * createPresentation takes a list of verifiable credentials and combine them into a verifiable presentation.
 * @param req the request consist of a JSON body with a list of verifiable credentials, and the holder DID.
 * @param res responds with a verifiable presentation in a JSON format.
 */
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

/**
 * addEmploymentContractToDb adds employment contract data to the Firestore database.
 * @param req takes a request body as JSON containing the ID for the document, and the subject data.
 * @param res responds with the ID of the document created and its data in a JSON format.
 */
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

/**
 * addTerminationContractToDb adds termination contract data to the Firestore database.
 * @param req takes a request body as JSON containing the ID for the document, and the subject data.
 * @param res responds with the ID of the document created and its data in a JSON format.
 */
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

/**
 * getEmploymentContract retrieves an employment contract document from the Firestore database.
 * @param req the request has a parameter containing the ID of the document.
 * @param res responds with the document data as JSON.
 */
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

/**
 * getTerminationContract retrieves a termination contract document from the Firestore database.
 * @param req the request has a parameter containing the ID of the document.
 * @param res responds with the document data as JSON.
 */
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

/**
 * deleteEmploymentContractFromDb deletes an employment contract document from the Firestore database.
 * @param req the request has one parameter containing the ID of the document.
 * @param res responds with the deleted document in a JSON format.
 */
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

/**
 * deleteTerminationContractFromDb deletes a termination contract document from the Firestore database.
 * @param req the request has one parameter containing the ID of the document.
 * @param res responds with the deleted document in a JSON format.
 */
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

/**
 * getMainIdentifier retrieves the main identifier managed by the agent.
 * @param req takes no request.
 * @param res responds with a DID document in a JSON format.
 */
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

/**
 * handleMessaging handles incoming messages containing a VP JWT. If the VP qualifies for contract VCs, contract VCs
 * are sent back to the DID that sent the message.
 * @param req takes a request containing a message in a JSON format.
 * @param res responds with a status stating whether the transaction was successful or not.
 */
const handleMessaging = async (req: Request, res: Response) => {
	try {
		const generatedCredentials = [];
		// handle incoming message to retrieve the token from the encrypted message body
		const message = await agentSymfoni.handleMessage({
			raw: req.body as string,
			metaData: [{type: 'message'}],
			save: false
		});
	
		const messagePresentationToken = message.data.messageData;
		const senderDid = message.from;
	
		const mainIdentifier = await symfoniAgentController.getMainIdentifier();

		if (mainIdentifier instanceof Error) {
			return res.status(500).json({
				error: mainIdentifier.message
			});
		}

		const mainDid = mainIdentifier.did;

		const isQualified = await symfoniAgentController.isQualifiedForContractVCs(messagePresentationToken);

		if (!isQualified) {
			return res.status(400).json({
				error: 'person does not have the right credentials'
			});
		}

		const handledMessage = await symfoniAgentController.agent.handleMessage({
			raw: messagePresentationToken
		});

		const ssn: string = handledMessage.credentials?.at(0)?.credentialSubject.person.SSN;

		// TODO: Consider hashing in the dbGetTerminationContract and dbGetEmploymentContract functions.
		const ssnHash = hashString(ssn);

		const terminationContractData = await dbGetTerminationContract(ssnHash);
		const employmentContractData = await dbGetEmploymentContract(ssnHash);

		// if any contract fetch from db throws an error, just end the transaction completly
		if (terminationContractData instanceof Error || employmentContractData instanceof Error) {
			return res.status(400).json({
				error: 'something went wrong when trying to fetch from the database.'
			});
		}

		// only make termination vc if symfoni has the termination data
		if (typeof terminationContractData !== 'undefined') {
			const terminationVCObject: any = {
				id: senderDid,
				termination: terminationContractData['termination']
			};
			// make credential
			const terminationVC = await symfoniAgentController.createTerminationCredential(mainDid, terminationVCObject);
			if (!(terminationVC instanceof Error)) {
				generatedCredentials.push(terminationVC.proof.jwt);
			}
		}

		// only make the employment vc if symfoni has the employment data
		if (typeof employmentContractData !== 'undefined') {
			const employmentVCObject: any = {
				id: senderDid,
				employment: employmentContractData['employment']
			
			};
			// make credential
			const employmentVC = await symfoniAgentController.createEmploymentCredential(mainDid, employmentVCObject);
		
			// as long as it is not an error, push it to the credentials array.
			if (!(employmentVC instanceof Error)) {
				generatedCredentials.push(employmentVC.proof.jwt);	
			}
		}
	
		// as long as the list of generated credentials are not empty, send the credentials
		if (generatedCredentials.length !== 0) {
			for (let index = 0; index < generatedCredentials.length; index++) {
				await symfoniAgentController.sendMessage(senderDid, 'SymfoniCredential', generatedCredentials[index]);
			}
			return res.status(200).json({
				success: 'issued credentials'
			});
		}

		return res.status(400).json({ Error: 'unable to handle the message' });
	
	} catch (error) {
		return res.status(500).json({
			error
		});
	}
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