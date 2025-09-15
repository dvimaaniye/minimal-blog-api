import { Router } from 'express';

import { postController } from '@/controllers';

const postRouter: Router = Router();

postRouter.post('/', postController.createPost);
postRouter.get('/:slug', postController.getPost);
postRouter.patch('/:slug', postController.updatePost);
postRouter.delete('/:slug', postController.deletePost);

export default postRouter;
