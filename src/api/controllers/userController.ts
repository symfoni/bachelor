/** source/controllers/posts.ts */
import { VerifiableCredential } from '@veramo/core';
import { Request, Response } from 'express';
import { AgentController } from '../../controllers/AgentController';
import { agentUser } from '../../veramo/veramo.setup';

const userAgentController = new AgentController(agentUser, 'user');

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

	await userAgentController.createDID(alias, provider, kms).then((did) => {	
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
	await userAgentController.getDID(did).then((identifier) => {
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
	await userAgentController.listAllDIDs().then((didList) => {
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
	userAgentController.resolveDID(did).then((didDocument) => {
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

	await userAgentController.addCredential(credential).then((credentialHash) => {
		if (typeof credentialHash !== 'string') {
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
	await userAgentController.getAllCredentials().then((credentialList) => {
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
	await userAgentController.getCredentialBasedOnType(credentialType).then((credentialList) => {
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

	await userAgentController.verifyJWT(jwt).then((isValid) => {
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
	try {
		const credentials: VerifiableCredential[] = [];
		let holder: string = req.body.holder;
  
		// TODO: Add a typeguard that returns an error if credentials is not of type VC[]
	
		// if holder is not specified, use default DID
		if (typeof holder === 'undefined') {
			await userAgentController.getMainIdentifier().then((mainIdentifier)=>{
				
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
		await userAgentController.createPresentation(holder, credentials).then((presentation) => {
			if (presentation instanceof Error) {
				return res.status(400).json({
					error: presentation.message
				});
			}
			return res.status(201).json({
				presentation
			});
		});
	} catch (error) {
		return res.status(400).json({
			error: 'unable to create presenatation, make sure that the credentials are inside an array.'
		});
	}

};

/**
 * handleMessage handles incoming messages by storing them in the local database.
 * @param req takes a request containing a body of a message object in a JSON format.
 * @param res responds with a status stating whether the message was successfuly stored or not.
 */
const handleMessage = async (req: Request, res: Response) => {

	// handle message
	const message = await agentUser.handleMessage({
		raw: req.body as string,
		metaData: [{type: 'message'}],
		save: false
	});

	if (message === null) {
		return res.status(400).json({
			error: 'bad message object'
		});
	}

	await userAgentController.agent.dataStoreSaveMessage({message: message});
    
	return res.status(200).json({ success: 'message recieved and stored in the database' });
};

/**
 * getMessages retrieves all localy stored messages.
 * @param req takes no request.
 * @param res responds with all the localy stored messages in a list in a JSON format.
 */
const getMessages = async (req: Request, res: Response) => {
	const messages = await userAgentController.agent.dataStoreORMGetMessages();
	if (messages.length === 0) {
		return res.status(400).json({
			error: 'no messages found'
		});
	}

	return res.status(200).json({
		messages
	});
};

/**
 * getMainIdentifier retrieves the main identifier managed by the agent.
 * @param req takes no request.
 * @param res responds with a DID document in a JSON format.
 */
const getMainIdentifier = async (req: Request, res: Response) => {
	const mainIdentifier = await userAgentController.getMainIdentifier();
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
 * sendMessage sends a message.
 * @param req takes a request containing the recipient DID, message type, and the message itself in a JSON format.
 * @param res responds with a status stating whether the message was successfuly sent or not.
 */
const sendMessage = async (req: Request, res: Response) => {
	try {
		// get params from body
		const toDid: string = req.body.toDid;
		const mainIdentifier = await userAgentController.getMainIdentifier();

		if (mainIdentifier instanceof Error) {
			return res.status(500).json({
				error: mainIdentifier.message
			});
		}

		const fromDid: string = mainIdentifier.did;
		const type: string = req.body.type;
		const message: object = req.body.message;

		// use params to send message
		const messageSent = await userAgentController.sendMessage(toDid, type, message, fromDid);

		if (messageSent instanceof Error) {
			return res.status(400).json({
				error: messageSent.message
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

/**
 * getMessage retrieves a specific message from the local database.
 * @param req takes a request with a parameter of the message ID.
 * @param res responds with the message found in a JSON format.
 */
const getMessage = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const message = await userAgentController.agent.dataStoreGetMessage({
			'id': id
		});

		if (message) {
			return res.status(200).json(message);
		}
	} catch (error) {
		return res.status(400).json({
			error: 'no message found for this id'
		});
	}
};

/**
 * deleteCredential deletes a credential from the local database.
 * @param req takes a request with a parameter containing the hash/ID of the credential to delete.
 * @param res responds with a status stating whether the credential was deleted or not.
 */
const deleteCredential = async (req: Request, res: Response) => {
	try {
		const credentialHah = req.params.hash;

		await agentUser.dataStoreDeleteVerifiableCredential({
			hash: credentialHah
		});

		return res.status(200).json({
			success: 'deleted the credential'
		});

	} catch (error) {
		console.error(error);
		return res.status(400).json({
			error: 'unable to delete the credential'
		});
	}
};

/**
 * handleMessageToken handles an encrypted message token to read its content.
 * @param req takes a parameter containing a message token.
 * @param res responds with the data hidden in the encrypted message.
 * @returns 
 */
const handleMessageToken = async (req: Request, res: Response) => {
	try {
		const token: string = req.params.token;

		const handledMessage = await userAgentController.agent.handleMessage({
			raw: token
		});

		return res.status(200).json({
			handledMessage
		});

	} catch (error) {
		return res.status(400).json({
			error: 'could not handle the message token'
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
	handleMessage,
	getMainIdentifier,
	sendMessage,
	getMessages,
	getMessage,
	deleteCredential,
	handleMessageToken
};