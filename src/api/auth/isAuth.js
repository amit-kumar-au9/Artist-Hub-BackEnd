const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');
const { getUserDetail } = require('../models/authModel');

const authChecker = (req, res, next) => {
	const headertoken = req.header('auth-token');
	const sessionToken = req.session.authToken;
	if (sessionToken) {
		if (headertoken) {
			if (sessionToken === headertoken) {
				try {
					const user_id = jwt.verify(headertoken, secret);
					getUserDetail(user_id.id, (err, result) => {
						if (err)
							return res.json({
								status: 500,
								message: 'DB error',
							});
						if (result) {
							req.userData = result;
							next();
						} else {
							return res.json({
								status: 300,
								message: 'Invalid token id',
							});
						}
					});
				} catch (err) {
					return res.json({
						status: 300,
						message: 'Invalid token id',
					});
				}
			} else {
				return res.json({
					status: 300,
					message: 'No session found for this token',
				});
			}
		} else {
			return res.json({
				status: 300,
				message: 'Token not present in header',
			});
		}
	} else {
		return res.json({
			status: 300,
			message: 'Session not found, Login again',
		});
	}
};

module.exports = authChecker;
