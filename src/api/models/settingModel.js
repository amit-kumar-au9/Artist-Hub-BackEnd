const userSchema = require('../schema/userSchema');

exports.editThemeColor = (userId, color, callback) => {
	try {
		userSchema
			.findOneAndUpdate(String(userId), { themeColor: color })
			.then(() => {
				callback('', {
					message: 'Color Changed',
					status: 200,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
