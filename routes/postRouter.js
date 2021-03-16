const Router = require('express').Router();

const {
	addPost,
	updatePost,
	getPostDetailByPostId,
	geAllPostByUser,
	deletePost,
	pinPost,
	unpinPost,
	getAllPost,
	getAllPinnedPostByUser,
} = require('../controllers/postController');

const { newPostValidation } = require('../validations/postValidation');

Router.post('/addPost', newPostValidation, addPost);
Router.post('/updatePost/:postId', newPostValidation, updatePost);
Router.get('/getPostDetail/:postId', getPostDetailByPostId);
Router.get('/getPostByUser/:userId', geAllPostByUser);
Router.get('/deletePost/:postId', deletePost);
Router.get('/pinPost/:postId', pinPost);
Router.get('/unpinPost/:postId', unpinPost);
Router.get('/getAllPost', getAllPost);
Router.get('/getPinnedPostByUser', getAllPinnedPostByUser);

module.exports = Router;
