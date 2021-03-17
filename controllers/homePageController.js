const homePageModel = require('../models/homePageModel');

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
