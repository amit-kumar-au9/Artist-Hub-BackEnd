const settingModel = require('../models/settingModel');

exports.editThemeColor = (req, res, next) => {
	try {
		console.log('theme', req.userData._id);
		settingModel.editThemeColor(
			req.userData._id,
			req.body.color,
			(err, reply) => {
				if (err) return next(err);
				return res.json(reply);
			},
		);
	} catch (error) {
		return next(error);
	}
};
