const imageSchema = require('../schema/postFilesSchema');

exports.addImage = (data, callback) => {
	try {
		imageSchema.create(data, (err, reply) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Image Uploaded',
				status: 200,
			});
		});
	} catch (error) {
		callback(error);
	}
};
