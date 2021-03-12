const Router = require('express').Router();

const {
	addImage,
	getPostImages,
	deleteImage,
	updateImage,
} = require('../controllers/imageVideoController');

const authChecker = require('../auth/isAuth');

const { ImageValidation } = require('../validations/imageValidation');

Router.post('/addImage', authChecker, ImageValidation, addImage);
Router.post('/updateImages', authChecker, updateImage);
Router.post('/deleteImages', authChecker, deleteImage);
Router.get('/getImages/:postId', authChecker, getPostImages);

module.exports = Router;
