import { Request, Response } from 'express';
import { StateAgentController } from '../../controllers/StateAgentController';
import { businessVerifiableCredential } from '../../types/businessVCtype';
import { personVerifiableCredential } from '../../types/personVCType';

const stateAgentController = new StateAgentController('state');

const createPersonCredential = async (req: Request, res: Response) => {
	let issuer: string = req.body.issuer;
	const credentialSubject: personVerifiableCredential['credentialSubject'] = req.body.credentialSubject;

	// TODO: Possibly make this if statement a utility function as it used many times.
	if (typeof issuer === 'undefined') {
		await stateAgentController.getMainIdentifier().then((identifier) => {
			if (typeof identifier === 'string') {
				return res.status(500).json({
					error: 'unable to retrieve main identifier'
				});
			}
			issuer = identifier.did;
		});
	}

	await stateAgentController.createPersonCredential(issuer, credentialSubject).then((credential) => {
		// TODO: Validate against context schema
		return res.status(201).json({
			credential
		});
	});
};

// create business credential
const createBusinessCredential = async (req: Request, res: Response) => {
	let issuer: string = req.body.issuer;
	const credentialSubject: businessVerifiableCredential['credentialSubject'] = req.body.credentialSubject;

	// TODO: Possibly make this if statement a utility function as it used many times.
	if (typeof issuer === 'undefined') {
		await stateAgentController.getMainIdentifier().then((identifier) => {
			if (typeof identifier === 'string') {
				return res.status(500).json({
					error: 'unable to retrieve main identifier'
				});
			}
			issuer = identifier.did;
		});
	}

	await stateAgentController.createBusinessCredential(issuer, credentialSubject).then((credential) => {
		// TODO: Validate against context schema
		return res.status(201).json({
			credential
		});
	});
};

export default { createPersonCredential, createBusinessCredential };