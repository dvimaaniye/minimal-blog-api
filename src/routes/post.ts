import { Router } from 'express';
import multer from 'multer';

import { postController } from '@/controllers';
import { cacheCurried } from '@/middlewares/cache';
import { sec } from '@/utils';

const postRouter: Router = Router();

const upload = multer({
	dest: 'uploads/',
	limits: { fileSize: 2 * 1000 * 1000 },
});

const cacheTwoMin = cacheCurried(sec('2 min'));

postRouter.get('/', cacheTwoMin('posts:'), postController.getAllPostsOfUser);
postRouter.post('/', upload.single('thumbnail'), postController.createPost);
postRouter.get('/:slug', cacheTwoMin('post:'), postController.getPost);
postRouter.patch('/:slug', postController.updatePost);
postRouter.delete('/:slug', postController.deletePost);

export default postRouter;
