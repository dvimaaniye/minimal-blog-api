import { Router } from 'express';

import { userController } from '@/controllers';

const userRouter: Router = Router();

userRouter.post('/', userController.createUser);
userRouter.get('/profile', userController.getCurrentUserProfile);
userRouter.get('/:id', userController.getUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
