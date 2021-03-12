const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	location: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	occassion: {
		type: String,
		required: true,
		min: 10,
		max: 255,
	},
	caption: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	description: {
		type: String,
		required: true,
		min: 6,
	},
	tags: {
		type: Array,
		required: false,
	},
	active: {
		type: Number,
		required: true,
		default: 1,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('post', postSchema);
