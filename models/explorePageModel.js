const postSchema = require('../schema/postSchema');
const pipeline = require('./pipeline');

exports.getAllPost = (callback) => {
	try {
		postSchema
			.aggregate([
				{ $match: { active: 1.0 } },
				{
					$addFields: {
						postId: { $toString: '$_id' },
						userId: { $toObjectId: '$userId' },
					},
				},
				pipeline.postFilesLookup,
				pipeline.userLookup,
				{
					$project: {
						...pipeline.userProject,
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
				{
					$addFields: {
						postId: { $toString: '$_id' },
						userId: { $toObjectId: '$userId' },
					},
				},
				pipeline.postFilesLookup,
				pipeline.userLookup,
				{
					$project: {
						...pipeline.userProject,
						'all_files._id': 0,
						postId: 0,
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
				{
					$addFields: {
						postId: { $toString: '$_id' },
						userId: { $toObjectId: '$userId' },
					},
				},
				pipeline.postFilesLookup,
				pipeline.userLookup,
				{
					$project: {
						...pipeline.userProject,
						'all_files._id': 0,
						postId: 0,
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
