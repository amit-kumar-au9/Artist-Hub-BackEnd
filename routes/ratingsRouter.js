const Router = require('express').Router();

const {
	addRating,
	updateRating,
	deleteRating,
	getRatings,
} = require('../controllers/ratingsController');

const authChecker = require('../auth/isAuth');

Router.get('/addRating/:postId', authChecker, addRating);
Router.get('/updateRating/:postId', authChecker, updateRating);
Router.get('/deleteRating/:postId', authChecker, deleteRating);
Router.get('/getRatings/:postId', authChecker, getRatings);

module.exports = Router;
