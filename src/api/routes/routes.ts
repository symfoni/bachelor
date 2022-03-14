import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

// user endpoints
router.post('/user/did', userController.createDID);
router.get('/user/did/:did', userController.getDID);
router.get('/user/dids', userController.listDIDs);
router.get('/user/resolve/:did', userController.resolveDID);
router.post('/user/db/credential', userController.addCredential);

// symfoni endpoints

// NAV endpoints

// state endpoints

export default router;