const postModel = require('../models/postModel');

exports.addPost = (req, res, next) => {
	try {
		const data = {
			userId: req.userData._id,
			location: req.body.location,
			occassion: req.body.occassion,
			caption: req.body.caption,
			description: req.body.description,
			tags: req.body.tags,
		};
		postModel.addPost(data, (err, response) => {
			if (err) throw err;
			return res.json(response);
		});
	} catch (error) {
		next(error);
	}
};

exports.updatePost = (req, res, next) => {
	try {
		const data = {
			location: req.body.location,
			occassion: req.body.occassion,
			caption: req.body.caption,
			description: req.body.description,
			tags: req.body.tags,
		};
		postModel.updatePost(req.params.postId, data, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.getPost = (req, res, next) => {
	try {
		postModel.getPost(req.params.postId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.getPostByUser = (req, res, next) => {
	try {
		postModel.getPostByUser(req.params.userId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.deletePost = (req, res, next) => {
	try {
		postModel.deletePost(req.params.postId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};
