const explorePageModel = require('../models/explorePageModel');

//sort by time
exports.getAllPost = (req, res, next) => {
	try {
		explorePageModel.getAllPost(req.query.page_no, (err, reply) => {
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
		explorePageModel.getPostByOccasssion(
			req.params.type,
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

//search post by tags
exports.getPostByTag = (req, res, next) => {
	try {
		explorePageModel.getPostByTag(
			req.params.tag,
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
