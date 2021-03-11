const Joi = require('joi');

exports.loginSchema = Joi.object({
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
});

exports.registerSchema = Joi.object({
	name: Joi.string().min(6).required(),
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
});

exports.postSchema = Joi.object({
	location: Joi.string().min(1).required(),
	occassion: Joi.string().min(1).required(),
	caption: Joi.string().min(1).required(),
	description: Joi.string().min(1).required(),
	tags: Joi.string().min(6),
});
