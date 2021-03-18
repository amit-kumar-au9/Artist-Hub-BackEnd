const Router = require('express').Router();

const {
	getAllPost,
	getPostForYou,
	getMostRatedPost,
	getTrendingPost,
	getPostByOccasssion,
	getPostByTag,
} = require('../controllers/homePageController');

Router.get('/getAllPost', getAllPost); //sort by time
Router.get('/getPostForYou', getPostForYou); //post of followed artist by latest post

Router.get('/getMostRatedPost', getMostRatedPost); //sort by rating
Router.get('/getTrendingPost', getTrendingPost); //sort by likes

Router.get('/getPostByOccasssion/:type', getPostByOccasssion); //search post by occassion
Router.get('/getPostByTag/:tag', getPostByTag); //search post by tags

module.exports = Router;

// Router.get('/getLatestPost', getLatestPost); //sort by time of followed artist
