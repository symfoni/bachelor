import express from 'express';
import stateController from '../controllers/stateController';
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
router.post('/symfoni/did', symfoniController.createDID);
router.get('/symfoni/did/:did', symfoniController.getDID);
router.get('/symfoni/dids', symfoniController.listDIDs);
router.get('/symfoni/resolve/:did', symfoniController.resolveDID);
router.post('/symfoni/credential', symfoniController.addCredential);
router.get('/symfoni/credentials', symfoniController.listCredentials);
router.get('/symfoni/credential/:type', symfoniController.getCredential);
router.post('/symfoni/presentation', symfoniController.createPresentation);

// NAV endpoints


// state endpoints
router.post('/state/personCredential', stateController.createPersonCredential);
router.post('/state/businessCredential', stateController.createBusinessCredential);

export default router;