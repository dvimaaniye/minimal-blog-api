import { RequestHandler } from 'express';

const userController: UserController = {
	createUser: (req, res) => {
		res.send('create user');
	},
	getUser: (req, res) => {
		res.send('get a user');
	},
	updateUser: (req, res) => {
		res.send('update user');
	},
	deleteUser: (req, res) => {
		res.send('delete user');
	},
	getCurrentUserProfile: (req, res) => {
		res.json(req.user);
	},
};

interface UserController {
	createUser: RequestHandler;
	getUser: RequestHandler;
	updateUser: RequestHandler;
	deleteUser: RequestHandler;
	getCurrentUserProfile: RequestHandler;
}

export default userController;
