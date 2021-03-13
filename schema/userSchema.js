const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'user',
	},
	profilePic: {
		type: String,
		default: '',
	},
	isActive: {
		type: Number,
		default: 1,
	},
	coverPic: {
		type: String,
		required: false,
	},
	shortDesc: {
		type: String,
		required: false,
	},
	occassions: {
		type: Array,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('user', userSchema);
