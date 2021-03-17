const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

const artistProfileModel = require('../models/artistProfileModel');

const updatePic = (updateData, req, callback) => {
	cloudinary.uploader.destroy(req.body.imageId, (err, destroyReply) => {
		if (err) return callback(err);
		if (destroyReply.result == 'not found') {
			return callback('', {
				message: 'Picture not found',
				status: 400,
			});
		}
		const imageFile = req.files.imageFile;
		cloudinary.uploader.upload(
			imageFile.tempFilePath,
			{ folder: 'artist_profile' },
			(err, reply) => {
				if (err) return callback(err);
				const data = {
					[updateData[0]]: reply.secure_url,
					[updateData[1]]: reply.public_id,
				};
				artistProfileModel.updateProfile(
					req.userData._id,
					data,
					(err) => {
						if (err) return callback(err);
						return callback('', {
							message: 'Picture updated',
							status: 200,
						});
					},
				);
			},
		);
	});
};

const removePic = (updateData, req, callback) => {
	cloudinary.uploader.destroy(req.body.imageId, (err, destroyReply) => {
		if (err) return callback(err);
		if (destroyReply.result == 'not found') {
			return callback('', {
				message: 'Picture not found',
				status: 400,
			});
		}
		const data = {
			[updateData[0]]: '',
			[updateData[1]]: '',
		};
		artistProfileModel.updateProfile(req.userData._id, data, (err) => {
			if (err) return callback(err);
			return callback('', {
				message: 'Picture removed',
				status: 200,
			});
		});
	});
};

const addPic = (updateData, req, callback) => {
	const imageFile = req.files.imageFile;
	cloudinary.uploader.upload(
		imageFile.tempFilePath,
		{ folder: 'artist_profile' },
		(err, reply) => {
			if (err) return callback(err);
			const data = {
				[updateData[0]]: reply.secure_url,
				[updateData[1]]: reply.public_id,
			};
			artistProfileModel.updateProfile(req.userData._id, data, (err) => {
				if (err) return callback(err);
				return callback('', {
					message: 'Picture added',
					status: 200,
				});
			});
		},
	);
};

exports.editPic = (req, res, next) => {
	try {
		if (req.params.type == 'coverPic' || req.params.type == 'profilePic') {
			var data = [`${req.params.type}`, `${req.params.type}Id`];
		} else {
			return res.json({ message: 'Wrong url', status: 300 });
		}
		if (req.files && req.body.imageId) {
			updatePic(data, req, (err, reply) => {
				fs.rmdirSync('tmp', { recursive: true });
				if (err) throw err;
				return res.json(reply);
			});
		} else if (req.files) {
			addPic(data, req, (err, reply) => {
				fs.rmdirSync('tmp', { recursive: true });
				if (err) throw err;
				return res.json(reply);
			});
		} else if (req.body.imageId) {
			removePic(data, req, (err, reply) => {
				fs.rmdirSync('tmp', { recursive: true });
				if (err) throw err;
				return res.json(reply);
			});
		}
	} catch (error) {
		next(error);
	}
};

// edit short desc, occassion, name
exports.editDetails = (req, res, next) => {
	try {
		const data = {
			occassions: req.body.occassions,
			shortDesc: req.body.shortDesc,
			name: req.body.name,
		};
		artistProfileModel.updateProfile(req.userData._id, data, (err) => {
			if (err) throw err;
			return res.json({
				message: 'Profile details updated',
				status: 200,
			});
		});
	} catch (error) {
		next(error);
	}
};

exports.getDetails = (req, res, next) => {
	try {
		artistProfileModel.getDetails(req.userData._id, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.getAllPostByUser = (req, res, next) => {
	try {
		artistProfileModel.getAllPostByUser(req.params.userId, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.getAllPinnedPostByUser = (req, res, next) => {
	try {
		artistProfileModel.getAllPinnedPostByUser(
			req.userData._id,
			(err, reply) => {
				if (err) throw err;
				return res.json(reply);
			},
		);
	} catch (error) {
		next(error);
	}
};

exports.getMostRatedPostByUserId = (req, res, next) => {
	try {
		artistProfileModel.getMostRatedPostByUserId(
			req.params.userId,
			(err, reply) => {
				if (err) throw err;
				return res.json(reply);
			},
		);
	} catch (error) {
		next(error);
	}
};
