const Router = require('express').Router();

const {
	loginUser,
	registerUser,
	logoutUser,
} = require('../controllers/authController');

const {
	loginValidation,
	registerValidation,
} = require('../validations/authValidation');

Router.post('/registerUser', registerValidation, registerUser);
Router.post('/loginUser', loginValidation, loginUser);
Router.get('/logout', logoutUser);

module.exports = Router;
