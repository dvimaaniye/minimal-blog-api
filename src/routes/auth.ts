import { Router } from 'express';

import { authController } from '@/controllers';

const authRouter: Router = Router();

authRouter.get('/login/google', authController.handleGoogleLogin);
authRouter.get('/login/google/callback', authController.handleGoogleCallback);
authRouter.get('/logout', authController.handleLogout);

export default authRouter;
