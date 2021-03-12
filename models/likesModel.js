const likeSchema = require('../schema/likesSchema');

exports.addLike = (likeData, callback) => {
	try {
		likeSchema
			.findOne(likeData)
			.then((reply) => {
				if (reply) {
					return callback('', {
						message: 'Post already liked',
						status: 300,
					});
				} else {
					likeSchema.create(likeData, (err, _) => {
						if (err) return callback(err);
						return callback('', {
							message: 'Post liked',
							status: 200,
						});
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getLikes = (postId, callback) => {
	try {
		likeSchema
			.find({ postId: postId })
			.then((data) => {
				if (data.length != 0) {
					callback('', {
						message: 'All likes data send',
						status: 200,
						data: data,
					});
				} else {
					callback('', {
						message: 'Post Likes not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getlikeCounts = (postId, callback) => {
	try {
		likeSchema
			.countDocuments({ postId: postId })
			.then((count) => {
				callback('', {
					message: 'Likes count send',
					status: 200,
					count: count,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.unLike = (data, callback) => {
	try {
		likeSchema
			.findOneAndRemove(data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post unliked',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post like not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
