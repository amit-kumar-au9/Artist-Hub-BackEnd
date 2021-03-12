const Router = require('express').Router();

const {
	addComment,
	updateComment,
	deleteComment,
	getComments,
} = require('../controllers/commentsController');

const authChecker = require('../auth/isAuth');

Router.get('/addComment/:postId', authChecker, addComment);
Router.get('/updateComment/:postId', authChecker, updateComment);
Router.get('/deleteComment/:postId', authChecker, deleteComment);
Router.get('/getComments/:postId', authChecker, getComments);

module.exports = Router;
