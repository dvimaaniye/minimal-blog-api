import { RequestHandler } from 'express';

const postController: PostController = {
	createPost: (req, res) => {
		res.send('create post');
	},
	getPost: (req, res) => {
		const { slug } = req.params;
		res.send(`get a post: ${slug}`);
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
