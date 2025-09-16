import { Router } from 'express';

import { authController } from '@/controllers';
import { isAuthenticatedGuard, isGuestGuard } from '@/guards';

const authRouter: Router = Router();

authRouter.get('/login/google', isGuestGuard, authController.handleGoogleLogin);
authRouter.get(
	'/login/google/callback',
	isGuestGuard,
	authController.handleGoogleCallback,
);
authRouter.get('/logout', isAuthenticatedGuard, authController.handleLogout);

export default authRouter;
