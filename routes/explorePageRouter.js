const Router = require('express').Router();

const {
	getAllPost,
	getPostByOccasssion,
	getPostByTag,
} = require('../controllers/explorePageController');

Router.get('/getAllPost', getAllPost); //sort by time
Router.get('/getPostByOccasssion/:type', getPostByOccasssion); //search post by occassion
Router.get('/getPostByTag/:tag', getPostByTag); //search post by tags

module.exports = Router;
