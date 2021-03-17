const userSchema = require('../schema/userSchema');
const postSchema = require('../schema/postSchema');

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

exports.getAllPostByUser = (userId, callback) => {
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

exports.getMostRatedPostByUserId = (user_id, callback) => {
	try {
		postSchema
			.aggregate([
				{
					$match: {
						active: 1,
						userId: user_id,
					},
				},
				{
					$addFields: {
						postId: {
							$toString: '$_id',
						},
					},
				},
				{
					$lookup: {
						from: 'ratings',
						let: {
							post_id: '$postId',
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ['$postId', '$$post_id'],
									},
								},
							},
							{
								$group: {
									_id: '$postId',
									avgRating: {
										$avg: '$rating',
									},
								},
							},
						],
						as: 'ratings',
					},
				},
				{
					$project: {
						'ratings._id': 0,
					},
				},
				{
					$unwind: '$ratings',
				},
				{
					$sort: { 'ratings.avgRating': -1 },
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
