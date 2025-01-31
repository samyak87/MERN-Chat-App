import express from 'express';
import { loginController,signupController,logoutController, updateProfileController,checkAuthController } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/logout',logoutController);

// updating profile
router.put('/update-profile', protectRoute, updateProfileController);

//checking user's authentication
router.get('/check', protectRoute,checkAuthController);

export default router;