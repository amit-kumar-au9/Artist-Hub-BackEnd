const postSchema = require('../schema/postSchema');
const pipeline = require('./pipeline');
const { page_size } = require('../utils/config');

// show post of all user in which I am in userId1 in 'follower' collection
exports.getPostForYou = (userId, page_no, callback) => {
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
				pipeline.avgRatingLookup,
				pipeline.commentsLookup,
				pipeline.totalLikesLookup,
				pipeline.postFilesLookup,
				pipeline.userLookup,
				{
					$addFields: {
						userId: { $toString: '$userId' },
					},
				},
				pipeline.followerLookup,
				{
					$match: {
						'users.userId1': String(userId),
					},
				},
				{
					$project: {
						...pipeline.userProject,
						'all_files._id': 0,
						users: 0,
					},
				},
				{ $match: { 'userData.isActive': 1 } },
				{ $unwind: '$all_files' },
				{
					$skip: page_size * (page_no - 1),
				},
				{
					$limit: page_size,
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

exports.getMostRatedPost = (page_no, callback) => {
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
				pipeline.avgRatingLookup,
				pipeline.totalLikesLookup,
				pipeline.commentsLookup,
				pipeline.userLookup,
				pipeline.postFilesLookup,
				{
					$project: {
						...pipeline.userProject,
						'all_files._id': 0,
					},
				},
				{ $match: { 'userData.isActive': 1 } },
				{ $unwind: '$all_files' },
				{ $sort: { 'ratings.avgRating': -1 } },
				{
					$skip: page_size * (page_no - 1),
				},
				{
					$limit: page_size,
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

exports.getTrendingPost = (page_no, callback) => {
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
				pipeline.totalLikesLookup,
				pipeline.avgRatingLookup,
				pipeline.commentsLookup,
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
				{
					$skip: page_size * (page_no - 1),
				},
				{
					$limit: page_size,
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
