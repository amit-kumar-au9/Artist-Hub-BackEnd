const postSchema = require('../schema/postSchema');

exports.addPost = (postData, callback) => {
	try {
		postSchema.create(postData, (err, reply) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Post added',
				status: 200,
				data: reply,
			});
		});
	} catch (error) {
		callback(error);
	}
};
