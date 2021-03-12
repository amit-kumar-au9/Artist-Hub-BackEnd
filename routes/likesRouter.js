const Router = require('express').Router();

const {
	addLike,
	unLike,
	getLikes,
	getlikeCounts,
} = require('../controllers/likesController');

const authChecker = require('../auth/isAuth');

Router.get('/addLike/:postId', authChecker, addLike);
Router.get('/unLike/:postId', authChecker, unLike);
Router.get('/getLikes/:postId', authChecker, getLikes);
Router.get('/getlikeCounts/:postId', authChecker, getlikeCounts);

module.exports = Router;
