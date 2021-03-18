const Router = require('express').Router();

const {
	savePost,
	removePost,
	getAllSavedPost,
} = require('../controllers/savePostController');

Router.get('/savePost/:postId', savePost);
Router.get('/removePost/:postId', removePost);
Router.get('/getAllSavedPost', getAllSavedPost);

module.exports = Router;
