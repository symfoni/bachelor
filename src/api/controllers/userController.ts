/** source/controllers/posts.ts */
import { Request, Response } from 'express';
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

// list dids
const listDIDs = async (req: Request, res: Response) => {
	await userAgentController.listAllDIDs().then((didList) => {
		return res.status(200).json({
			listOfDids: didList
		});
	});
};

// 

export default { createDID, listDIDs };