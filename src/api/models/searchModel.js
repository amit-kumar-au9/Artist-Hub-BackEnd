const userSchema = require('../schema/userSchema');

exports.findByKeyword = (keyword, callback) => {
	try {
		userSchema
			.aggregate([
				{ $match: { name: { $regex: new RegExp(keyword) } } },
				{
					$sort: {
						name: 1,
					},
				},
			])
			.then((response) => {
				if (response) {
					callback('', {
						message: 'Search result',
						status: 200,
						data: response,
					});
				} else {
					callback('', {
						message: 'Search not found',
						status: 300,
						data: response,
					});
				}
			})
			.catch((err) => {
				callback(err);
			});
	} catch (error) {
		return callback(error);
	}
};
