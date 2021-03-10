const userSchema = require('../schema/User');

exports.registerUser = (userData, callback) => {
	try {
		userSchema.findOne({ email: userData.email }, (err, reply) => {
			if (err) callback(err);
			if (reply)
				callback('', {
					message: 'User email already exist',
					status: 300,
				});
			else {
				userSchema(userData).save();
				callback('', {
					message: 'Register Successfull',
					status: 200,
				});
			}
		});
	} catch (err) {
		callback(err);
	}
};

exports.loginUser = (email, callback) => {
	try {
		userSchema.findOne({ email: email }, (err, reply) => {
			if (err) callback(err);
			return callback('', reply);
		});
	} catch (err) {
		callback(err);
	}
};
