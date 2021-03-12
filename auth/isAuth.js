const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');
const { getUserDetail } = require('../models/userAuthModel');

const authChecker = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.json({ status: 200, message: 'User not logged in' });
	try {
		const user_id = jwt.verify(token, secret);
		getUserDetail(user_id.id, (err, result) => {
			if (err) return res.json({ status: 500, message: 'DB error' });
			if (result) {
				req.userData = result;
				next();
			} else {
				return res.json({ status: 300, message: 'Invalid token id' });
			}
		});
	} catch (err) {
		return res.json({ status: 300, message: 'Invalid token id' });
	}
};

module.exports = authChecker;
