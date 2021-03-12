const Router = require('express').Router();

const {
	addComment,
	updateComment,
	deleteComment,
	getComments,
	getCommentsCounts,
} = require('../controllers/commentsController');

const authChecker = require('../auth/isAuth');

Router.post('/addComment/:postId', authChecker, addComment);
Router.post('/updateComment/:commentId', authChecker, updateComment);
Router.get('/deleteComment/:commentId', authChecker, deleteComment);
Router.get('/getComments/:postId', authChecker, getComments);
Router.get('/getCommentsCounts/:postId', authChecker, getCommentsCounts);

module.exports = Router;
