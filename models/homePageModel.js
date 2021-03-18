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

exports.getMostRatedPost = (userId, callback) => {
	try {
		callback('', {
			message: 'Logic not ready',
			status: 400,
		});
	} catch (error) {
		callback(error);
	}
};

exports.getTrendingPost = (userId, callback) => {
	try {
		callback('', {
			message: 'Logic not ready',
			status: 400,
		});
	} catch (error) {
		callback(error);
	}
};
