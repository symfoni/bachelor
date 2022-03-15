import {Request, Response} from 'express';
import { SymfoniAgentController } from '../../controllers/SymfoniAgentController';

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

export default {createDID};