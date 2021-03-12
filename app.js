const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6700;
const { mongo_url } = require('./utils/config');

// import routes
const userAuthRouter = require('./routes/userAuthRouter');
const postRouter = require('./routes/postRouter');
const imageRouter = require('./routes/imageRouter');
const likeRouter = require('./routes/likesRouter');

const app = express();
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get('/health', (req, res) => {
	return res.json({ message: 'Health OK' });
});

// route middleware
app.use('/auth', userAuthRouter);
app.use('/post', postRouter);
app.use('/image', imageRouter);
app.use('/like', likeRouter);

// CONNECT TO DB
mongoose
	.connect(mongo_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

app.use((err, req, res, next) => {
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
