const homePageModel = require('../models/homePageModel');

//sort by time
exports.getAllPost = (req, res, next) => {
	try {
		homePageModel.getAllPost((err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

//post of followed artist
exports.getPostForYou = (req, res, next) => {
	try {
		homePageModel.getPostForYou(req.userData._id, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

//sort by time of followed artist
exports.getLatestPost = (req, res, next) => {
	try {
		homePageModel.getLatestPost(req.userData._id, (err, reply) => {
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
		homePageModel.getMostRatedPost(req.userData._id, (err, reply) => {
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
		homePageModel.getTrendingPost(req.userData._id, (err, reply) => {
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
		homePageModel.getPostByOccasssion(req.params.type, (err, reply) => {
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
		homePageModel.getPostByTag(req.params.tag, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};
