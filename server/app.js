const express = require('express');
const app = express();
const PORT = process.env.PORT || 6700;
const mongoose = require('mongoose');

app.use(express.json());

app.get('health', (req, res) => {
	return res.json({ message: 'Health OK' });
});

// CONNECT TO DB
mongoose.connect(
	'mongodb+srv://admin:mongo123@cluster0.pwmth.mongodb.net/jwt_user?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) throw err;
		console.log('connected to db');
	},
);

server.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server is running at port ${PORT}`);
});
