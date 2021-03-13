const Router = require('express').Router();

const {
	addPost,
	updatePost,
	getPost,
	getPostByUser,
	deletePost,
	pinPost,
	unpinPost,
	getAllPost,
	getPinnedPostByUser,
} = require('../controllers/postController');

const { newPostValidation } = require('../validations/postValidation');

Router.post('/addPost', newPostValidation, addPost);
Router.post('/updatePost/:postId', newPostValidation, updatePost);
Router.get('/getPostDetail/:postId', getPost);
Router.get('/getPostByUser/:userId', getPostByUser);
Router.get('/deletePost/:postId', deletePost);
Router.get('/pinPost/:postId', pinPost);
Router.get('/unpinPost/:postId', unpinPost);
Router.get('/getAllPost', getAllPost);
Router.get('/getPinnedPostByUser', getPinnedPostByUser);

module.exports = Router;
