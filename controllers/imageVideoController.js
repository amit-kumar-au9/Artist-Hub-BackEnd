const imageModel = require('../models/imageVideoModel');

const cloudinary = require('../utils/cloudinary');

exports.addImage = (req, res, next) => {
	try {
		const imageFile = req.files.imageFile;
		cloudinary.uploader.upload(imageFile.tempFilePath, (err, reply) => {
			console.log(reply);
			if (err) throw err;
			const data = {
				postId: req.body.postId,
				file_path: reply.secure_url,
				cloudinary_id: reply.public_id,
				isImage: req.body.isImage,
			};
			imageModel.addImage(data, (err) => {
				if (err) throw err;
				return res.json({ message: 'File Uploaded', status: 200 });
			});
		});
	} catch (err) {
		next(err);
	}
};
