import { Request, Response } from 'express';
import { agentTest } from '../../veramo/setup';

const logMessage = async (req: Request, res: Response) => {
	console.log(req.body);

	const message = await agentTest.handleMessage({
		raw: req.body as any as string,
		metaData: [{type: 'test'}],
		save: false
	});

    //console.log(message);

	if (message) {
		return res.json({ id: message.id });
	}
    
    return res.status(400).json({ Error: 'Failed' });

};

export default { logMessage };