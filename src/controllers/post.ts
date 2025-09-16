import { RequestHandler } from 'express';
import z from 'zod';

import { Post } from '@/models';
import { CreatePostSchema } from '@/types/post';
import { toSlug } from '@/utils';

const postController: PostController = {
	createPost: async (req, res) => {
		const validationResult = await CreatePostSchema.safeParseAsync(req.body);

		if (validationResult.error) {
			console.error('Input validation failed:', validationResult.error);
			res.status(422).json({
				message: 'Input validation failed',
				error: z.treeifyError(validationResult.error),
			});
			return;
		}

		const data = validationResult.data;
		const post = await Post.create({ ...data, slug: toSlug(data.title) });

		res.status(201).json({ message: 'Post created successfully', data: post });
	},

	getPost: async (req, res) => {
		const { slug } = req.params;
		const post = await Post.findOne({ where: { slug } });
		if (post === null) {
			res.status(404).json({ message: `Post ${slug} not found` });
			return;
		}

		res.status(200).json({ message: 'Post found', data: post });
	},

	getAllPostsOfUser: (req, res) => {
		res.send('get all posts of user');
	},

	updatePost: (req, res) => {
		res.send('update post');
	},

	deletePost: (req, res) => {
		res.send('delete post');
	},
};

interface PostController {
	createPost: RequestHandler;
	getPost: RequestHandler;
	getAllPostsOfUser: RequestHandler;
	updatePost: RequestHandler;
	deletePost: RequestHandler;
}

export default postController;
