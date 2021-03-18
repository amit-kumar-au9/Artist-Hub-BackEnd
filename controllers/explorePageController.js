const explorePageModel = require('../models/explorePageModel');

//sort by time
exports.getAllPost = (req, res, next) => {
	try {
		explorePageModel.getAllPost((err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

//search post by occassion
exports.getPostByOccasssion = (req, res, next) => {
	try {
		explorePageModel.getPostByOccasssion(req.params.type, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

//search post by tags
exports.getPostByTag = (req, res, next) => {
	try {
		explorePageModel.getPostByTag(req.params.tag, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};
