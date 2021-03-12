const commentsSchema = require('../schema/commentsSchema');

exports.addComment = (data, callback) => {
	try {
		commentsSchema.create(data, (err, _) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Comment added',
				status: 200,
			});
		});
	} catch (error) {
		callback(error);
	}
};

exports.getComments = (postId, callback) => {
	try {
		commentsSchema
			.find({ postId: postId })
			.then((data) => {
				if (data.length != 0) {
					callback('', {
						message: 'All comment data send',
						status: 200,
						data: data,
					});
				} else {
					callback('', {
						message: 'Post comment not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getCommentsCounts = (postId, callback) => {
	try {
		commentsSchema
			.countDocuments({ postId: postId })
			.then((count) => {
				callback('', {
					message: 'Comments count send',
					status: 200,
					count: count,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.deleteComment = (commentId, callback) => {
	try {
		commentsSchema
			.findByIdAndRemove(commentId)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post comment deleted',
						status: 200,
						data: reply,
					});
				} else {
					callback('', {
						message: 'Post comment not found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.updateComment = (postId, data, callback) => {
	try {
		commentsSchema
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
