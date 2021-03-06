/** source/controllers/posts.ts */
import { VerifiableCredential } from '@veramo/core';
import { Request, Response } from 'express';
import { NAVAgentController } from '../../controllers/NAVAgentController';
import { agentNAV } from '../../veramo/veramo.setup';

const navAgentController = new NAVAgentController('nav');

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

	await navAgentController.createDID(alias, provider, kms).then((did) => {
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
	await navAgentController.getDID(did).then((identifier) => {
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

/**
 * listDIDs lists all the DIDs managed by the agent.
 * @param req takes no request.
 * @param res respinds with a list of DIDs in JSON format, or an error if it was unable to look up the database.
 */
const listDIDs = async (req: Request, res: Response) => {
	await navAgentController.listAllDIDs().then((didList) => {
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
	navAgentController.resolveDID(did).then((didDocument) => {
		if (didDocument instanceof Error) {
			return res.status(400).json({
				error: didDocument.message
			});
		} else if (typeof didDocument.didDocument?.id === 'undefined') {
			return res.status(400).json({
				error: didDocument
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

	await navAgentController.addCredential(credential).then((credentialHash) => {
		if (credentialHash instanceof Error) {
			return res.status(400).json({
				error: credentialHash.message
			});
		}
		
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
	await navAgentController.getAllCredentials().then((credentialList) => {
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
	await navAgentController.getCredentialBasedOnType(credentialType).then((credentialList) => {
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

	await navAgentController.verifyJWT(jwt).then((isValid) => {
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
		await navAgentController.getMainIdentifier().then((mainIdentifier)=>{
			
			if (mainIdentifier instanceof Error) {
				return res.status(500).json({
					fatal_error: mainIdentifier.message
				});
			}

			holder = mainIdentifier.did;
		});
	}

	// if no credentials were added in the request body
	if (req.body.listOfCredentials.length === 0) {
		return res.status(400).json({
			error: 'empty list of credentials'
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	req.body.listOfCredentials.forEach((credential: any) => {
		credentials.push(credential['verifiableCredential']);
	});
    
	await navAgentController.createPresentation(holder, credentials).then((presentation) => {
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
 * getMainIdentifier retrieves the main identifier managed by the agent.
 * @param req takes no request.
 * @param res responds with a DID document in a JSON format.
 */
const getMainIdentifier = async (req: Request, res: Response) => {
	const mainIdentifier = await navAgentController.getMainIdentifier();
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
 * handleMessage handles messages recieved by NAV, resolves a VP JWT and sends a message back stating whether
 * the person qualifies for unemployment benefits or not.
 * @param req takes a request body in a text format consisting of an encrypted message.
 * @param res responds with a positive status code if a message was sent back.
 */
const handleMessage = async (req: Request, res: Response) => {
	try {
		// handle incoming message to retrieve the token from the encrypted message body
		const message = await agentNAV.handleMessage({
			raw: req.body as string,
			metaData: [{type: 'message'}],
			save: false
		});
	
		const messagePresentationToken = message.data.messageData;
		const senderDid = message.from;
	
		// check if the presentation token qualifies for unemployment benefits
		const isQualified = await navAgentController.isQualifiedForUnemploymentBenefits(messagePresentationToken);
		
		// if the token qualifies, then send a message back
		if (isQualified) {
			await navAgentController.sendMessage(
				senderDid, 
				'Unemployment Benefit Qualification', 
				{
					result: 'You qualify for unemployment benefits.'
				}
			);
		} else if (!isQualified) {
			await navAgentController.sendMessage(
				senderDid, 
				'Unemployment Benefit Qualification', 
				{
					result: 'You do not qualify for unemployment benefits.'
				}
			);
		}
	
		// if nothing fails, return status code 200
		return res.status(200);

	} catch (error) {
		return res.status(500).json({
			error: 'unable to handle message'
		});
	}
};

export default { 
	createDID, 
	listDIDs, 
	resolveDID, 
	getDID, 
	addCredential, 
	listCredentials, 
	getCredential, 
	createPresentation, 
	verifyJWT,
	getMainIdentifier,
	handleMessage
};