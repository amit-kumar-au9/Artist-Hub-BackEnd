const Router = require('express').Router();

const { addPost } = require('../controllers/postController');
const authChecker = require('../auth/isAuth');

const { newPostValidation } = require('../validations/postValidation');

Router.post('/addPost', authChecker, newPostValidation, addPost);

module.exports = Router;
