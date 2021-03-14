const Router = require('express').Router();

const {
	editDetails,
	editPic,
	getDetails,
} = require('../controllers/artistProfileController');

const { ProfileImageValidation } = require('../validations/imageValidation');

Router.post('/editPic/:type', ProfileImageValidation, editPic);
Router.post('/editDetails', editDetails);
Router.get('/getDetails', getDetails);

module.exports = Router;
