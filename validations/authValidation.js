const Joi = require('joi');

exports.loginValidation = (req, res, next) => {
	const loginSchema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.json({
			message: 'Login failed',
			status: 400,
			error: error.details[0].message,
		});
	}
	next();
};

exports.registerValidation = (req, res, next) => {
	const registerSchema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	const { error } = registerSchema.validate(req.body);
	if (error) {
		return res.json({
			message: 'Register failed',
			status: 400,
			error: error.details[0].message,
		});
	}
	next();
};
