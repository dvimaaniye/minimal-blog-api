import { RequestHandler } from 'express';
import z from 'zod';

import { Post } from '@/models';
import { CreatePostSchema, UpdatePostSchema } from '@/types/post';
import { toSlug } from '@/utils';

const postController: PostController = {
	createPost: async (req, res) => {
		const validationResult = await CreatePostSchema.safeParseAsync(req.body);

		if (validationResult.error) {
			console.error('Input validation failed:', validationResult.error);
			return res.status(422).json({
				message: 'Input validation failed',
				error: z.treeifyError(validationResult.error),
			});
		}

		const data = validationResult.data;
		const post = await Post.create({ ...data, slug: toSlug(data.title) });

		return res.status(201).json(post);
	},

	getPost: async (req, res) => {
		const { slug } = req.params;
		const post = await Post.findOne({ where: { slug } });
		if (post === null) {
			return res.status(404).json({ message: `Post ${slug} not found` });
		}

		return res.status(200).json(post);
	},

	getAllPostsOfUser: async (req, res) => {
		const posts = await Post.findAll({ where: { author_id: req.user?.id } });
		return res.status(200).json(posts);
	},

	updatePost: async (req, res) => {
		const { slug } = req.params;

		const validationResult = await UpdatePostSchema.safeParseAsync(req.body);
		if (validationResult.error) {
			console.error('Input validation failed:', validationResult.error);
			return res.status(422).json({
				message: 'Input validation failed',
				error: z.treeifyError(validationResult.error),
			});
		}

		const data = validationResult.data;

		try {
			const [affectedRows] = await Post.update(data, {
				where: { author_id: req.user?.id, slug },
			});

			if (affectedRows === 0) {
				return res
					.status(404)
					.json({ message: 'Post not found or not owned by user' });
			}

			const updatedPost = await Post.findOne({
				where: { author_id: req.user?.id, slug },
			});

			return res.status(200).json(updatedPost);
		} catch (error) {
			console.error('Failed to update post:', error);
			return res
				.status(500)
				.json({ message: `Could not update the post ${slug}`, error });
		}
	},

	deletePost: async (req, res) => {
		const { slug } = req.params;

		try {
			await Post.destroy({ where: { slug, author_id: req.user?.id } });
		} catch (error) {
			console.error(`Error while deleting post ${slug}`);
			return res.status(500).json({ message: "Couldn't delete post", error });
		}

		return res
			.status(200)
			.json({ message: `Post ${slug} deleted successfully` });
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
