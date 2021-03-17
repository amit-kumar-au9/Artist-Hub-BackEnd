const Router = require('express').Router();

const { getAllPost } = require('../controllers/homePageController');

Router.get('/getAllPost', getAllPost);

module.exports = Router;
