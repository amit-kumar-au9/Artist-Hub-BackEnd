const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 6700;
const { mongo_url } = require('./utils/config');

const authChecker = require('./auth/isAuth');
// import routes
const userAuthRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const imageRouter = require('./routes/imageRouter');
const likeRouter = require('./routes/likesRouter');
const commentRouter = require('./routes/commentsRouter');
const ratingRouter = require('./routes/ratingsRouter');
const artistProfileRouter = require('./routes/artistProfileRouter');
const homePageRouter = require('./routes/homePageRouter');
const explorePageRouter = require('./routes/explorePageRouter');
const followerRouter = require('./routes/followerRouter');
const saveRouter = require('./routes/saveRouter');
const settingRouter = require('./routes/settingRouter');

const app = express();
app.use(cors()); //enable cors
app.use(express.json()); //enable json
app.use(fileUpload({ useTempFiles: true })); //enable file upload

app.get('/health', (req, res) => {
	return res.json({ message: 'Health OK' });
});

// route middleware
app.use('/auth', userAuthRouter);
app.use('/post', authChecker, postRouter);
app.use('/image', authChecker, imageRouter);
app.use('/like', authChecker, likeRouter);
app.use('/comment', authChecker, commentRouter);
app.use('/rating', authChecker, ratingRouter);
app.use('/artist', authChecker, artistProfileRouter);
app.use('/home', authChecker, homePageRouter);
app.use('/explore', authChecker, explorePageRouter);
app.use('/follower', authChecker, followerRouter);
app.use('/save', authChecker, saveRouter);
app.use('/setting', authChecker, settingRouter);

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

// default error handler of express
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
