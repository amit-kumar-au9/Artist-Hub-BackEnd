const postSchema = require('../schema/postSchema');
const pipeline = require('./pipeline');

exports.getPostForYou = (userId, callback) => {
	try {
		callback('', {
			message: 'Logic not ready',
			status: 400,
		});
	} catch (error) {
		callback(error);
	}
};

exports.getMostRatedPost = (callback) => {
	try {
		postSchema
			.aggregate([
				{ $match: { active: 1 } },
				{
					$addFields: {
						postId: { $toString: '$_id' },
						userId: { $toObjectId: '$userId' },
					},
				},
				pipeline.ratingLookup,
				pipeline.postFilesLookup,
				pipeline.userLookup,
				{
					$project: {
						...pipeline.userProject,
						'all_files._id': 0,
					},
				},
				{ $match: { 'userData.isActive': 1 } },
				{ $unwind: '$all_files' },
				{ $sort: { 'ratings.avgRating': -1 } },
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

exports.getTrendingPost = (callback) => {
	try {
		postSchema
			.aggregate([
				{ $match: { active: 1 } },
				{
					$addFields: {
						postId: { $toString: '$_id' },
						userId: { $toObjectId: '$userId' },
					},
				},
				pipeline.likesLookup,
				pipeline.postFilesLookup,
				pipeline.userLookup,
				{
					$project: {
						...pipeline.userProject,
						'all_files._id': 0,
						'likes._id': 0,
					},
				},
				{ $match: { 'userData.isActive': 1 } },
				{ $unwind: '$all_files' },
				{ $sort: { 'likes.likesCount': -1 } },
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
