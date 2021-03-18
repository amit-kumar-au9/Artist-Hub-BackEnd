exports.postFilesLookup = {
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
};

exports.userLookup = {
	$lookup: {
		from: 'users',
		localField: 'userId',
		foreignField: '_id',
		as: 'userData',
	},
};

exports.likesLookup = {
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
};

exports.ratingLookup = {
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
};

exports.userProject = {
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
};
