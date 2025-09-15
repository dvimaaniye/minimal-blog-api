import { Router } from 'express';

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
router.use('/api/posts', apiRateLimit, postRouter);
router.use('/api/users', apiRateLimit, userRouter);

export default router;
