/** source/controllers/posts.ts */
import { VerifiableCredential } from '@veramo/core';
import { Request, Response } from 'express';
import { AgentController } from '../../controllers/AgentController';
import { agentNAV } from '../../veramo/setup';

const navAgentController = new AgentController(agentNAV, 'user');

// creates a DID
const createDID = async (req: Request, res: Response) => {
	const alias: string = req.body.alias;
	const provider: string = req.body.provider;
	const kms: string = req.body.kms;

	await navAgentController.createDID(alias, provider, kms).then((did) => {
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
	await navAgentController.getDID(did).then((identifier) => {
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

// resolves a did
const resolveDID = async (req: Request, res: Response) => {
	const did: string = req.params.did;
	navAgentController.resolveDID(did).then((didDocument) => {
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

	await navAgentController.addCredential(credential).then((credentialHash) => {
		return res.status(201).json({
			credentialHash
		});
	});

};

// list all saved credentials in the database
const listCredentials = async (req: Request, res: Response) => {
	await navAgentController.getAllCredentials().then((credentialList) => {
		return res.status(200).json({
			listOfCredentials: credentialList
		});
	});
};

// retrieve credential(s) based on type
const getCredential = async (req: Request, res: Response) => {
	const credentialType: string = req.params.type;
	await navAgentController.getCredentialBasedOnType(credentialType).then((credentialList) => {
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
    
	await navAgentController.createPresentation(holder, credentials).then((presentation) => {
		return res.status(201).json({
			presentation
		});
	});

};

export default { createDID, listDIDs, resolveDID, getDID, addCredential, listCredentials, getCredential, createPresentation };