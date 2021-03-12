const postSchema = require('../schema/postSchema');

exports.addPost = (postData, callback) => {
	try {
		postSchema.create(postData, (err, _) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Post added',
				status: 200,
			});
		});
	} catch (error) {
		callback(error);
	}
};

exports.getPost = (postId, callback) => {
	try {
		postSchema
			.find({ _id: postId, active: 1 })
			.then((data) => {
				if (data.length != 0) {
					callback('', {
						message: 'Post data send',
						status: 200,
						data: data,
					});
				} else {
					callback('', {
						message: 'Post not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getPostByUser = (userId, callback) => {
	try {
		postSchema
			.find({ userId: userId, active: 1 })
			.then((data) => {
				if (data.length != 0) {
					callback('', {
						message: 'Posts data send',
						status: 200,
						data: data,
					});
				} else {
					callback('', {
						message: 'No post found for user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.updatePost = (postId, data, callback) => {
	try {
		postSchema
			.findByIdAndUpdate(postId, data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post data updated',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.deletePost = (postId, callback) => {
	try {
		postSchema.findByIdAndUpdate(postId, { active: 0 }).then((reply) => {
			if (reply) {
				callback('', {
					message: 'Post deleted',
					status: 200,
					data: reply,
				});
			} else {
				callback('', {
					message: 'Post not found',
					status: 400,
				});
			}
		});
	} catch (error) {
		callback(error);
	}
};
