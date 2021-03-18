const postSchema = require('../schema/postSchema');

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
				{
					$lookup: {
						from: 'ratings',
						let: { post_id: '$postId' },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ['$postId', '$$post_id'] },
								},
							},
							{
								$group: {
									_id: '$postId',
									avgRating: { $avg: '$rating' },
								},
							},
						],
						as: 'ratings',
					},
				},
				{
					$lookup: {
						from: 'postfiles',
						let: { post_id: '$postId' },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ['$postId', '$$post_id'] },
								},
							},
							{
								$group: {
									_id: '$postId',
									files: { $push: '$file_path' },
								},
							},
						],
						as: 'all_files',
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'userId',
						foreignField: '_id',
						as: 'userData',
					},
				},
				{
					$project: {
						'userData.type': 0.0,
						'userData.occassions': 0,
						'userData.email': 0,
						'userData.password': 0,
						'userData.coverPic': 0,
						'userData.shortDesc': 0,
						'userData.date': 0,
						'userData.__v': 0,
						'userData.coverPicId': 0,
						'userData.profilePicId': 0,
						'userData._id': 0,
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
				{
					$lookup: {
						from: 'likes',
						let: { post_id: '$postId' },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ['$postId', '$$post_id'] },
								},
							},
							{
								$group: {
									_id: '$postId',
									likesCount: { $sum: 1 },
								},
							},
						],
						as: 'likes',
					},
				},
				{
					$lookup: {
						from: 'postfiles',
						let: { post_id: '$postId' },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ['$postId', '$$post_id'] },
								},
							},
							{
								$group: {
									_id: '$postId',
									files: { $push: '$file_path' },
								},
							},
						],
						as: 'all_files',
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'userId',
						foreignField: '_id',
						as: 'userData',
					},
				},
				{
					$project: {
						'userData.type': 0.0,
						'userData.occassions': 0,
						'userData.email': 0,
						'userData.password': 0,
						'userData.coverPic': 0,
						'userData.shortDesc': 0,
						'userData.date': 0,
						'userData.__v': 0,
						'userData.coverPicId': 0,
						'userData.profilePicId': 0,
						'userData._id': 0,
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
