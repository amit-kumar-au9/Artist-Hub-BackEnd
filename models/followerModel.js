const followerSchema = require('../schema/followerSchema');

exports.addFollower = (data, callback) => {
	try {
		followerSchema
			.findOne(data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Follower already followed, wrong request',
						status: 300,
					});
				} else {
					followerSchema
						.create(data)
						.then((reply) => {
							console.log(reply);
							callback('', {
								message: 'Follower added',
								status: 200,
							});
						})
						.catch((err) => callback(err));
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.removeFollower = (data, callback) => {
	try {
		followerSchema
			.findOneAndDelete(data)
			.then((reply) => {
				if (reply) {
					callback('', {
						message: 'Follower removed',
						status: 200,
					});
				} else {
					callback('', {
						message: 'Follower doesnot exist, wrong request',
						status: 300,
					});
				}
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getFollowerList = (data, callback) => {
	try {
		followerSchema
			.find(data)
			.then((reply) => {
				callback('', {
					message: 'Follower list send',
					status: 200,
					data: reply,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getFollowerCount = (data, callback) => {
	try {
		followerSchema
			.countDocuments(data)
			.then((count) => {
				callback('', {
					message: 'Follower count send',
					status: 200,
					count: count,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getFollowingList = (data, callback) => {
	try {
		followerSchema
			.find(data)
			.then((reply) => {
				callback('', {
					message: 'Following list send',
					status: 200,
					data: reply,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};

exports.getFollowingCount = (data, callback) => {
	try {
		followerSchema
			.countDocuments(data)
			.then((count) => {
				callback('', {
					message: 'Following count send',
					status: 200,
					count: count,
				});
			})
			.catch((err) => callback(err));
	} catch (error) {
		callback(error);
	}
};
