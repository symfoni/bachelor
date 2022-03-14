import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

// user endpoints
router.post('/user/did', userController.createDID);

// symfoni endpoints

// NAV endpoints

// state endpoints

export default router;