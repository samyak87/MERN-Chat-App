import express from 'express';
import { loginController,signupController,logoutController } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/logout',logoutController);

export default router;