const Router = require('express').Router();

const {
	addPost,
	updatePost,
	getPost,
	getPostByUser,
	deletePost,
} = require('../controllers/postController');
const authChecker = require('../auth/isAuth');

const { newPostValidation } = require('../validations/postValidation');

Router.post('/addPost', authChecker, newPostValidation, addPost);
Router.post('/updatePost/:postId', authChecker, newPostValidation, updatePost);
Router.get('/getPostDetail/:postId', authChecker, getPost);
Router.get('/getPostByUser/:userId', authChecker, getPostByUser);
Router.get('/deletePost/:postId', authChecker, deletePost);

module.exports = Router;
