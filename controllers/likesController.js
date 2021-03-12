const likeModel = require('../models/likesModel');

exports.addLike = (req, res, next) => {
	try {
		const data = {
			postId: req.params.postId,
			userId: req.userData._id,
		};
		likeModel.addLike(data, (err, response) => {
			if (err) throw err;
			return res.json(response);
		});
	} catch (error) {
		next(error);
	}
};

exports.getLikes = (req, res, next) => {
	try {
		likeModel.getLikes(req.params.postId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.getlikeCounts = (req, res, next) => {
	try {
		likeModel.getlikeCounts(req.params.postId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.unLike = (req, res, next) => {
	try {
		const data = {
			postId: req.params.postId,
			userId: req.userData._id,
		};
		likeModel.unLike(data, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};
