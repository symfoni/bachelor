import express from 'express';
import navController from '../controllers/navController';
import stateController from '../controllers/stateController';
import symfoniController from '../controllers/symfoniController';
import testController from '../controllers/testController';
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
router.post('/user/verifyJWT', userController.verifyJWT);

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
router.post('/symfoni/verifyJWT', userController.verifyJWT);
router.post('/symfoni/employmentContract', symfoniController.addEmploymentContractToDb);
router.get('/symfoni/employmentContract/:id', symfoniController.getEmploymentContract);
router.post('/symfoni/terminationContract', symfoniController.addTerminationContractToDb);
router.get('/symfoni/terminationContract/:id', symfoniController.getTerminationContract);
router.delete('/symfoni/terminationContract/:id', symfoniController.deleteTerminationContractFromDb);
router.delete('/symfoni/employmentContract/:id', symfoniController.deleteEmploymentContractFromDb);

// NAV endpoints
router.post('/nav/did', navController.createDID);
router.get('/nav/did/:did', navController.getDID);
router.get('/nav/dids', navController.listDIDs);
router.get('/nav/resolve/:did', navController.resolveDID);
router.post('/nav/credential', navController.addCredential);
router.get('/nav/credentials', navController.listCredentials);
router.get('/nav/credential/:type', navController.getCredential);
router.post('/nav/presentation', navController.createPresentation);
router.post('/nav/verifyJWT', userController.verifyJWT);

// state endpoints
router.post('/state/personCredential', stateController.createPersonCredential);
router.post('/state/businessCredential', stateController.createBusinessCredential);
router.post('/state/did', stateController.createDID);
router.get('/state/did/:did', stateController.getDID);
router.get('/state/dids', stateController.listDIDs);
router.get('/state/resolve/:did', stateController.resolveDID);
router.post('/state/credential', stateController.addCredential);
router.get('/state/credentials', stateController.listCredentials);
router.get('/state/credential/:type', stateController.getCredential);
router.post('/state/presentation', stateController.createPresentation);
router.post('/state/verifyJWT', stateController.verifyJWT);
router.post('/state/person', stateController.addPersonDataToDb);
router.get('/state/person/:id', stateController.getPersonDataFromDb);
router.delete('/state/person/:id', stateController.deletePersonDataFromDb);

// Test endpoints
router.post('/messaging', express.text({type:'*/*'}) , testController.logMessage);

export default router;