import express from 'express';
import symfoniController from '../controllers/symfoniController';
import userController from '../controllers/userController';
const router = express.Router();

// user endpoints
router.post('/user/did', userController.createDID);
router.get('/user/did/:did', userController.getDID);
router.get('/user/dids', userController.listDIDs);
router.get('/user/resolve/:did', userController.resolveDID);
router.post('/user/credential', userController.addCredential);
router.get('/user/credentials', userController.listCredentials);
router.get('/user/credential/:type', userController.getCredential);
router.post('/user/presentation', userController.createPresentation);

// symfoni endpoints
router.post('/symfoni/did', symfoniController.createDID);
router.post('/symfoni/employmentCredential', symfoniController.createEmploymentCredential);
router.post('/symfoni/terminationCredential', symfoniController.createTerminationCredential);

// NAV endpoints

// state endpoints

export default router;