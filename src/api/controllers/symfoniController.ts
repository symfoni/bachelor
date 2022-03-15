import { Request, Response } from 'express';
import { SymfoniAgentController } from '../../controllers/SymfoniAgentController';
import { employmentVC } from '../../types/employmentVCType';
import { terminationVC } from '../../types/terminationVCType';

const symfoniAgentController = new SymfoniAgentController('symfoni');

// creats a did for the symfoni agent
const createDID = async (req: Request, res: Response) => {
	const alias: string = req.body.alias;
	const provider: string = req.body.provider;
	const kms: string = req.body.kms;

	await symfoniAgentController.createDID(alias, provider, kms).then((did) => {
		return res.status(201).json({
			did
		});
	});
};

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

	symfoniAgentController.createEmploymentCredential(issuer, credentialClaims).then((credential) => {
		// TODO: Validate credential against schema
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

	symfoniAgentController.createTerminationCredential(issuer, credentialClaims).then((credential) => {
		// TODO: Validate credential against context schema
		return res.status(201).json({
			credential
		});
	});
};


export default { createDID, createEmploymentCredential, createTerminationCredential };