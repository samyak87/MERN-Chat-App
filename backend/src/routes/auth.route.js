import express from 'express';
import { loginController,signupController,logoutController, updateProfileController } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/logout',logoutController);

// updating profile
router.put('/update-profile', protectRoute, updateProfileController);
export default router;