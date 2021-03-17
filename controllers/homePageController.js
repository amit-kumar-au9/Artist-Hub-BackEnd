const postModel = require('../models/postModel');

exports.getAllPost = (req, res, next) => {
	try {
		postModel.getAllPost((err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};
