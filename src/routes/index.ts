import { Router } from 'express';

import { isAuthenticatedGuard, isGuestGuard } from '@/guards';
import {
	apiRateLimit,
	authRateLimit,
	globalRateLimit,
} from '@/middlewares/rate-limiter';

import authRouter from './auth';
import postRouter from './post';
import userRouter from './user';

const router: Router = Router();

router.use(globalRateLimit);
router.get('/', (_, res) => res.send('check'));
router.use('/auth', authRateLimit, authRouter);
router.use('/api/posts', apiRateLimit, isAuthenticatedGuard, postRouter);
router.use('/api/users', apiRateLimit, isAuthenticatedGuard, userRouter);

export default router;
