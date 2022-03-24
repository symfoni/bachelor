import { VerifiableCredential } from '@veramo/core';
import { Request, Response } from 'express';
import { SymfoniAgentController } from '../../controllers/SymfoniAgentController';
import { employmentVC } from '../../types/employmentVCType';
import { terminationVC } from '../../types/terminationVCType';

const symfoniAgentController = new SymfoniAgentController('symfoni');

// creates employment credential
const createEmploymentCredential = async (req: Request, res: Response) => {
	// read json input
	let issuer: string = req.body.issuer;

	const credentialClaims: employmentVC['credentialSubject'] = req.body.credentialSubject;

	if (typeof issuer === 'undefined') {
		await symfoniAgentController.getMainIdentifier().then((identifier) => {
			if (typeof identifier === 'string') {
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
	const credentialClaims: terminationVC['credentialSubject'] = req.body.credentialSubject;

	if (typeof issuer === 'undefined') {
		await symfoniAgentController.getMainIdentifier().then((identifier) => {
			if (typeof identifier === 'string') {
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
		if (typeof didDocument === 'string') {
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
	const credential: VerifiableCredential = {
		'@context': req.body['@context'],
		type: req.body.type,
		issuer: {
			id: req.body.issuer.id
		},
		credentialSubject: req.body.credentialSubject,
		proof: req.body.proof,
		issuanceDate: req.body.issuanceDate
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

// create presentation
const createPresentation = async (req: Request, res: Response) => {
	const credentials: VerifiableCredential[] = [];
	const holder: string = req.body.holder;
    
	// TODO: Add a typeguard that returns an error if credentials is not of type VC[]

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

export default { createEmploymentCredential, createTerminationCredential, createDID, listDIDs, resolveDID, getDID, addCredential, listCredentials, getCredential, createPresentation };