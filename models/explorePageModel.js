const postSchema = require('../schema/postSchema');

exports.getAllPost = (callback) => {
	try {
		postSchema
			.aggregate([
				{ $match: { active: 1.0 } },
				{ $addFields: { postId: { $toString: '$_id' } } },
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
				{ $addFields: { userId: { $toObjectId: '$userId' } } },
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
					},
				},
				{ $match: { 'userData.isActive': 1 } },
				{ $sort: { date: -1.0 } },
				{ $unwind: '$all_files' },
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

exports.getPostByOccasssion = (type, callback) => {
	try {
		postSchema
			.aggregate([
				{ $match: { active: 1, occassion: type } },
				{ $addFields: { postId: { $toString: '$_id' } } },
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
				{ $addFields: { userId: { $toObjectId: '$userId' } } },
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
						'all_files._id': 0,
						postId: 0,
						'userData._id': 0,
						'userData.type': 0,
						'userData.occassions': 0,
						'userData.email': 0,
						'userData.password': 0,
						'userData.coverPic': 0,
						'userData.shortDesc': 0,
						'userData.date': 0,
						'userData.__v': 0,
						'userData.coverPicId': 0,
						'userData.profilePicId': 0,
					},
				},
				{ $match: { 'userData.isActive': 1 } },
				{ $sort: { date: -1 } },
				{ $unwind: '$all_files' },
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

exports.getPostByTag = (tag, callback) => {
	try {
		postSchema
			.aggregate([
				{
					$match: {
						active: 1,
						tags: { $in: [new RegExp(tag)] },
					},
				},
				{ $addFields: { postId: { $toString: '$_id' } } },
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
				{ $addFields: { userId: { $toObjectId: '$userId' } } },
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
						'all_files._id': 0,
						postId: 0,
						'userData._id': 0,
						'userData.type': 0,
						'userData.occassions': 0,
						'userData.email': 0,
						'userData.password': 0,
						'userData.coverPic': 0,
						'userData.shortDesc': 0,
						'userData.date': 0,
						'userData.__v': 0,
						'userData.coverPicId': 0,
						'userData.profilePicId': 0,
					},
				},
				{ $match: { 'userData.isActive': 1 } },
				{ $sort: { date: -1 } },
				{ $unwind: '$all_files' },
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
