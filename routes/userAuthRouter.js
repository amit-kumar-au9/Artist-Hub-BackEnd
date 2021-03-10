const Router = require('express').Router();

const {
	loginUser,
	registerUser,
} = require('../controllers/userAuthController');

const {
	loginValidation,
	registerValidation,
} = require('../validations/authValidation');

Router.post('/registerUser', registerValidation, registerUser);
Router.post('/loginUser', loginValidation, loginUser);

module.exports = Router;
