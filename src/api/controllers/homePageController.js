const homePageModel = require('../models/homePageModel');

//post of followed artist
exports.getPostForYou = (req, res, next) => {
	try {
		homePageModel.getPostForYou(
			req.userData._id,
			req.query.page_no,
			(err, reply) => {
				if (err) throw err;
				return res.json(reply);
			},
		);
	} catch (error) {
		next(error);
	}
};

//sort by rating
exports.getMostRatedPost = (req, res, next) => {
	try {
		homePageModel.getMostRatedPost(req.query.page_no, (err, reply) => {
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
		homePageModel.getTrendingPost(req.query.page_no, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};
