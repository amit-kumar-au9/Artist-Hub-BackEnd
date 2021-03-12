const commentsModel = require('../models/commentsModel');

exports.addComment = (req, res, next) => {
	try {
		const data = {
			postId: req.params.postId,
			userId: req.userData._id,
			comment: req.body.comment,
		};
		commentsModel.addComment(data, (err, response) => {
			if (err) throw err;
			return res.json(response);
		});
	} catch (error) {
		next(error);
	}
};

exports.getComments = (req, res, next) => {
	try {
		commentsModel.getComments(req.params.postId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.getCommentsCounts = (req, res, next) => {
	try {
		commentsModel.getCommentsCounts(req.params.postId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteComment = (req, res, next) => {
	try {
		commentsModel.deleteComment(req.params.commentId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.updateComment = (req, res, next) => {
	try {
		const data = {
			comment: req.body.comment,
		};
		commentsModel.updateComment(
			req.params.commentId,
			data,
			(err, reply) => {
				if (err) throw err;
				return res.json(reply);
			},
		);
	} catch (error) {
		next(error);
	}
};
