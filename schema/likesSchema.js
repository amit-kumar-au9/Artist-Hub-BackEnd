const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	userId: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('likes', postSchema);
