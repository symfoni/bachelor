/** source/controllers/posts.ts */
import { VerifiableCredential } from '@veramo/core';
import { Request, Response } from 'express';
import { AgentController } from '../../controllers/AgentController';
import { agentUser } from '../../veramo/setup';

const userAgentController = new AgentController(agentUser, 'user');

// creates a DID
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

// get a specific did
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

// list dids
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

// resolves a did
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

// list all saved credentials in the database
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

// retrieve credential(s) based on type
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

// verify a jwt
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

// create presentation
const createPresentation = async (req: Request, res: Response) => {
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

};

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

// Retrieves messages from the database
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

// Returns the main identifier of the did
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

// sends a message from the user agent
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
		const type = req.body.type;
		const message = req.body.message;

		// use params to send message
		await userAgentController.sendMessage(toDid, type, message, fromDid);
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
	getMessages
};