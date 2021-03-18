const homePageModel = require('../models/homePageModel');

//post of followed artist
exports.getPostForYou = (req, res, next) => {
	try {
		homePageModel.getPostForYou(req.params.userId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

//sort by rating
exports.getMostRatedPost = (req, res, next) => {
	try {
		homePageModel.getMostRatedPost((err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

//sort by likes and rating
exports.getTrendingPost = (req, res, next) => {
	try {
		homePageModel.getTrendingPost((err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};
