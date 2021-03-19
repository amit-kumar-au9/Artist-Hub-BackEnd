const Router = require('express').Router();

const { editThemeColor } = require('../controllers/settingController');

Router.get('/editThemeColor', editThemeColor);

module.exports = Router;
