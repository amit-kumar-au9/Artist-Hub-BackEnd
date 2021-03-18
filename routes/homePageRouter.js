const Router = require('express').Router();

const {
	getAllPost,
	getPostForYou,
	getLatestPost,
	getMostRatedPost,
	getTrendingPost,
	getPostByOccasssion,
	getPostByTag,
} = require('../controllers/homePageController');

Router.get('/getAllPost', getAllPost); //sort by time
Router.get('/getPostForYou', getPostForYou); //post of followed artist
Router.get('/getLatestPost', getLatestPost); //sort by time of followed artist
Router.get('/getMostRatedPost', getMostRatedPost); //sort by rating
Router.get('/getTrendingPost', getTrendingPost); //sort by likes and rating
Router.get('/getPostByOccasssion/:type', getPostByOccasssion); //search post by occassion
Router.get('/getPostByTag/:tag', getPostByTag); //search post by tags

module.exports = Router;
