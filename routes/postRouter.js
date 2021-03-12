const Router = require('express').Router();

const {
	addPost,
	updatePost,
	getPost,
	getPostByUser,
	deletePost,
} = require('../controllers/postController');

const { newPostValidation } = require('../validations/postValidation');

Router.post('/addPost', newPostValidation, addPost);
Router.post('/updatePost/:postId', newPostValidation, updatePost);
Router.get('/getPostDetail/:postId', getPost);
Router.get('/getPostByUser/:userId', getPostByUser);
Router.get('/deletePost/:postId', deletePost);

module.exports = Router;
