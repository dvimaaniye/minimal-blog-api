import { RequestHandler } from 'express';
import z from 'zod';

import cloudinary from '@/config/cloudinary';
import { Post } from '@/models';
import { CreatePostSchema, UpdatePostSchema } from '@/types/post';
import { toSlug, uploadToCloudinary } from '@/utils';

const postController: PostController = {
	createPost: async (req, res) => {
		console.log(req.file);
		const validationResult = await CreatePostSchema.safeParseAsync(req.body);

		if (validationResult.error) {
			console.error('Input validation failed:', validationResult.error);
			return res.status(422).json({
				message: 'Input validation failed',
				error: z.treeifyError(validationResult.error),
			});
		}

		const data = validationResult.data;

		let thumbnailUrl: string | undefined;
		let thumbnailPublicId: string | undefined;

		try {
			if (req.file) {
				const uploadResult = await uploadToCloudinary(req.file);
				thumbnailUrl = uploadResult.secure_url;
				thumbnailPublicId = uploadResult.public_id;
			}

			const post = await Post.create({
				...data,
				slug: toSlug(data.title),
				thumbnail_url: thumbnailUrl,
				thumbnail_public_id: thumbnailPublicId,
			});

			return res.status(201).json(post);
		} catch (error) {
			console.error('Error in post creation with upload:', error);
			return res.status(500).json({ message: 'Error creating post', error });
		}
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
		try {
			const { slug } = req.params;
			const userId = req.user!.id;

			const post = await Post.findOne({
				where: { slug, author_id: userId },
			});

			if (!post) {
				return res.status(404).json({ message: 'Post not found' });
			}

			if (post.thumbnail_public_id) {
				await cloudinary.uploader.destroy(post.thumbnail_public_id, {
					resource_type: 'image',
				});
			}

			await post.destroy();

			return res
				.status(200)
				.json({ message: 'Post and associated image deleted successfully' });
		} catch (error) {
			console.error('Error deleting post:', error);
			return res.status(500).json({ message: 'Failed to delete post', error });
		}
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
