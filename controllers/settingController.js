const settingModel = require('../models/settingModel');

exports.editThemeColor = (req, res, next) => {
	try {
		settingModel.editThemeColor(
			req.userData._id,
			req.query.color,
			(err, reply) => {
				if (err) throw err;
				return res.json(reply);
			},
		);
	} catch (error) {
		next(error);
	}
};
