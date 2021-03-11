const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6700;
const { mongo_url } = require('./utils/config');
// import routes
const userAuthRouter = require('./routes/userAuthRouter');
const postRouter = require('./routes/postRouter');
const imageRouter = require('./routes/imageRouter');

const app = express();
app.use(fileUpload());
app.use(express.json());

app.get('/health', (req, res) => {
	return res.json({ message: 'Health OK' });
});

// route middleware
app.use('/auth', userAuthRouter);
app.use('/post', postRouter);
app.use('/image', imageRouter);

// CONNECT TO DB
mongoose.connect(
	mongo_url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) throw err;
		console.log('connected to db');
	},
);

app.use(function (err, req, res, next) {
	res.json({
		message: 'Error',
		status: 500,
		error: err,
	});
});

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server is running at port ${PORT}`);
});
