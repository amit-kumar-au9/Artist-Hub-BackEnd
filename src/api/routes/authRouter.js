const Router = require('express').Router();
const authChecker = require('../auth/isAuth');
const {
	loginUser,
	registerUser,
	logoutUser,
	getUserDetail,
	emailExist,
	passwordReset,
} = require('../controllers/authController');

const {
	loginValidation,
	registerValidation,
	resetPassword,
} = require('../validations/authValidation');

Router.post('/registerUser', registerValidation, registerUser);
Router.post('/loginUser', loginValidation, loginUser);
Router.get('/logout', logoutUser);
Router.get('/getUserDetail', authChecker, getUserDetail);
// forgot password
Router.get('/emailExist', emailExist);
Router.post('/passwordReset', resetPassword, passwordReset);

module.exports = Router;
