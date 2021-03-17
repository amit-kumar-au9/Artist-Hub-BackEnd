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
		const updateFor = {
			_id: req.params.postId,
			userId: req.userData._id,
		};
		postModel.updatePost(updateFor, data, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.getPostDetailByPostId = (req, res, next) => {
	try {
		postModel.getPostDetailByPostId(req.params.postId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.deletePost = (req, res, next) => {
	try {
		const deleteFor = {
			_id: req.params.postId,
			userId: req.userData._id,
		};
		postModel.deletePost(deleteFor, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.pinPost = (req, res, next) => {
	try {
		const pinFor = {
			_id: req.params.postId,
			userId: req.userData._id,
		};
		postModel.pinPost(pinFor, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.unpinPost = (req, res, next) => {
	try {
		const unpinFor = {
			_id: req.params.postId,
			userId: req.userData._id,
		};
		postModel.unpinPost(unpinFor, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};
