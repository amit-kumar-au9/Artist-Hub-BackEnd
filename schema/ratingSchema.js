const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
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
	rating: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('post', ratingSchema);
