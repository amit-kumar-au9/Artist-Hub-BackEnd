const Router = require('express').Router();

const { addImage } = require('../controllers/imageVideoController');
const authChecker = require('../auth/isAuth');

const { ImageValidation } = require('../validations/imageValidation');

Router.post('/addImage', authChecker, ImageValidation, addImage);

module.exports = Router;
