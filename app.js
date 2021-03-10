const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6700;
const { mongo_url } = require('./utils/config');
// import routes
const userAuthRouter = require('./routes/userAuthRouter');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
	return res.json({ message: 'Health OK' });
});

// route middleware
app.use('/auth', userAuthRouter);

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
