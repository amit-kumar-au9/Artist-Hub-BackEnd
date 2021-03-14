const userSchema = require('../schema/userSchema');

exports.updateProfile = (userId, data, callback) => {
	userSchema
		.findByIdAndUpdate(userId, data)
		.then(() => {
			callback('');
		})
		.catch((err) => callback(err));
};

exports.getDetails = (userId, callback) => {
	userSchema
		.findById(userId)
		.then((data) => {
			callback('', {
				message: 'Profile data send',
				status: 200,
				data: data,
			});
		})
		.catch((err) => callback(err));
};
