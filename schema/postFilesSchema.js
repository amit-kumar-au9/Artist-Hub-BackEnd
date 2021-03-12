const mongoose = require('mongoose');

const postFilesSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	file_path: {
		type: String,
		required: true,
	},
	isImage: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('postFiles', postFilesSchema);
