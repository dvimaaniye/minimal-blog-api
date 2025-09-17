import { Router } from 'express';

import { userController } from '@/controllers';
import { cacheCurried } from '@/middlewares/cache';
import { sec } from '@/utils';

const userRouter: Router = Router();

const cacheTwoMin = cacheCurried(sec('2 min'));

userRouter.post('/', userController.createUser);
userRouter.get(
	'/profile',
	cacheTwoMin('user:'),
	userController.getCurrentUserProfile,
);
userRouter.get('/:id', userController.getUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
