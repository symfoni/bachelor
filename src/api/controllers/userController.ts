/** source/controllers/posts.ts */
import { VerifiableCredential } from '@veramo/core';
import { json, Request, Response } from 'express';
import { AgentController } from '../../controllers/AgentController';
import { agentUser } from '../../veramo/setup';

const userAgentController = new AgentController(agentUser);

// creates a DID
const createDID = async (req: Request, res: Response) => {
	const alias: string = req.body.alias;
	const provider: string = req.body.provider;
	const kms: string = req.body.kms;

	await userAgentController.createDID(alias, provider, kms).then((did) => {
		return res.status(201).json({
			did
		});
	});
};

// get a specific did
const getDID = async (req: Request, res: Response) => {
	const did: string = req.params.did;
	await userAgentController.getDID(did).then((identifier) => {
		return res.status(200).json({
			identifier
		});
	});
};

// list dids
const listDIDs = async (req: Request, res: Response) => {
	await userAgentController.listAllDIDs().then((didList) => {
		return res.status(200).json({
			listOfDids: didList
		});
	});
};

// resolves a did
const resolveDID = async (req: Request, res: Response) => {
	const did: string = req.params.did;
	userAgentController.resolveDID(did).then((didDocument) => {
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

	await userAgentController.addCredential(credential).then((credentialHash) => {
		return res.status(201).json({
			credentialHash
		});
	});

};

// list all saved credentials in the database
const listCredentials = async (req: Request, res: Response) => {
	await userAgentController.getAllCredentials().then((credentialList) => {
		return res.status(200).json({
			listOfCredentials: credentialList
		});
	});
};

export default { createDID, listDIDs, resolveDID, getDID, addCredential, listCredentials };