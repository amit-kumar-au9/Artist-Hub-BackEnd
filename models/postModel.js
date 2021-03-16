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

exports.updatePost = (updateFor, data, callback) => {
	try {
		postSchema
			.findOneAndUpdate(updateFor, data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post data updated',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post not found for logged in user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getPostDetailByPostId = (postId, callback) => {
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

exports.geAllPostByUser = (userId, callback) => {
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

exports.deletePost = (deleteFor, callback) => {
	try {
		postSchema
			.findOneAndUpdate(deleteFor, { active: 0 })
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post deleted',
						status: 200,
						data: reply,
					});
				} else {
					callback('', {
						message: 'Post not found for logged in user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.pinPost = (pinFor, callback) => {
	try {
		postSchema
			.findOneAndUpdate(pinFor, { isPinned: true })
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post pinned',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post not found for logged in user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.unpinPost = (unpinFor, callback) => {
	try {
		postSchema
			.findOneAndUpdate(unpinFor, { isPinned: false })
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Post unpinned',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Post not found for logged in user',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getAllPinnedPostByUser = (userId, callback) => {
	try {
		postSchema
			.find({ userId: userId, isPinned: true })
			.then((reply) => {
				if (reply.length) {
					callback('', {
						message: 'All pinned post send',
						status: 200,
						data: reply,
					});
				} else {
					callback('', {
						message: 'No pinned post found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getAllPost = (callback) => {
	try {
		postSchema
			.aggregate([
				{ $match: { active: 1 } },
				{
					$lookup: {
						from: 'users',
						pipeline: [
							{
								$project: {
									_id: 0,
									profilePic: 1,
									name: 1,
								},
							},
						],
						as: 'userInfo',
					},
				},
				{
					$unwind: {
						path: '$userInfo',
					},
				},
				{
					$project: {
						isPinned: 0,
						__v: 0,
						active: 0,
					},
				},
			])
			.then((reply) => {
				if (reply.length) {
					callback('', {
						message: 'All post send',
						status: 200,
						data: reply,
					});
				} else {
					callback('', {
						message: 'No post found',
						status: 400,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
