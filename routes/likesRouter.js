const Router = require('express').Router();

const {
	addLike,
	unLike,
	getLikes,
	getlikeCounts,
} = require('../controllers/likesController');

Router.get('/addLike/:postId', addLike);
Router.get('/unLike/:postId', unLike);
Router.get('/getLikes/:postId', getLikes);
Router.get('/getlikeCounts/:postId', getlikeCounts);

module.exports = Router;
