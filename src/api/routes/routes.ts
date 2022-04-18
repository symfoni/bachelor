import express from 'express';
import navController from '../controllers/navController';
import stateController from '../controllers/stateController';
import symfoniController from '../controllers/symfoniController';
import userController from '../controllers/userController';
const router = express.Router();

// ------- USER ENDPOINTS -------
// did related
router.post('/user/did', userController.createDID);
router.get('/user/did/:did', userController.getDID);
router.get('/user/dids', userController.listDIDs);
router.get('/user/resolve/:did', userController.resolveDID);
router.get('/user/mainIdentifier', userController.getMainIdentifier);

// credential related
router.post('/user/credential', userController.addCredential);
router.get('/user/credentials', userController.listCredentials);
router.get('/user/credential/:type', userController.getCredential);
router.delete('/user/credential/:hash', userController.deleteCredential);

// presentation related
router.post('/user/presentation', userController.createPresentation);
router.post('/user/verifyJWT', userController.verifyJWT);

// message related
router.post('/user/messaging', express.text({type:'*/*'}) , userController.handleMessage);
router.post('/user/sendMessage', userController.sendMessage);
router.get('/user/messages', userController.getMessages);
router.get('/user/message/:id', userController.getMessage);


// ------- SYMFONI ENDPOINTS -------
// did related
router.post('/symfoni/did', symfoniController.createDID);
router.post('/symfoni/did', symfoniController.createDID);
router.get('/symfoni/did/:did', symfoniController.getDID);
router.get('/symfoni/dids', symfoniController.listDIDs);
router.get('/symfoni/resolve/:did', symfoniController.resolveDID);
router.get('/symfoni/mainIdentifier', symfoniController.getMainIdentifier);

// credential related
router.post('/symfoni/employmentCredential', symfoniController.createEmploymentCredential);
router.post('/symfoni/terminationCredential', symfoniController.createTerminationCredential);
router.post('/symfoni/credential', symfoniController.addCredential);
router.get('/symfoni/credentials', symfoniController.listCredentials);
router.get('/symfoni/credential/:type', symfoniController.getCredential);

// presenation related
router.post('/symfoni/presentation', symfoniController.createPresentation);
router.post('/symfoni/verifyJWT', userController.verifyJWT);

// database related
router.post('/symfoni/employmentContract', symfoniController.addEmploymentContractToDb);
router.get('/symfoni/employmentContract/:id', symfoniController.getEmploymentContract);
router.post('/symfoni/terminationContract', symfoniController.addTerminationContractToDb);
router.get('/symfoni/terminationContract/:id', symfoniController.getTerminationContract);
router.delete('/symfoni/terminationContract/:id', symfoniController.deleteTerminationContractFromDb);
router.delete('/symfoni/employmentContract/:id', symfoniController.deleteEmploymentContractFromDb);

// message related
router.post('/symfoni/messaging', express.text({type:'*/*'}) , symfoniController.handleMessaging);


// ------ NAV ENDPOINTS ------
// did related
router.post('/nav/did', navController.createDID);
router.get('/nav/did/:did', navController.getDID);
router.get('/nav/dids', navController.listDIDs);
router.get('/nav/resolve/:did', navController.resolveDID);
router.get('/nav/mainIdentifier', navController.getMainIdentifier);

// credential related
router.post('/nav/credential', navController.addCredential);
router.get('/nav/credentials', navController.listCredentials);
router.get('/nav/credential/:type', navController.getCredential);

// presentation related
router.post('/nav/presentation', navController.createPresentation);
router.post('/nav/verifyJWT', userController.verifyJWT);

// messaging related
router.post('/nav/messaging', express.text({type:'*/*'}), navController.handleMessage);


// ------ STATE ENDPOINTS ------
// did related
router.post('/state/did', stateController.createDID);
router.get('/state/did/:did', stateController.getDID);
router.get('/state/dids', stateController.listDIDs);
router.get('/state/resolve/:did', stateController.resolveDID);

// credential related
router.post('/state/credential', stateController.addCredential);
router.get('/state/credentials', stateController.listCredentials);
router.post('/state/personCredential', stateController.createPersonCredential);
router.post('/state/businessCredential', stateController.createBusinessCredential);
router.get('/state/credential/:type', stateController.getCredential);

// presentation related
router.post('/state/presentation', stateController.createPresentation);
router.post('/state/verifyJWT', stateController.verifyJWT);

// database related
router.post('/state/person', stateController.addPersonDataToDb);
router.get('/state/person/:id', stateController.getPersonDataFromDb);
router.delete('/state/person/:id', stateController.deletePersonDataFromDb);

// messaging related
router.post('/state/messaging', express.text({type:'*/*'}) , );
router.post('/state/sendMessage', stateController.sendMessage);

export default router;