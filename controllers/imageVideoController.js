const imageModel = require('../models/imageVideoModel');

const generateRandomString = (length = 8) =>
	Math.random().toString(20).substr(2, length);

exports.addImage = (req, res) => {
	const imageFile = req.files.imageFile;
	let imageFileName = `${generateRandomString()}${imageFile.name}`;
	imageFile.mv(`./public/images/${imageFileName}`, (err, _) => {
		if (err)
			return res
				.status(500)
				.json({ message: 'Server error', error: err });
		const data = {
			postId: req.body.postId,
			file_path: imageFileName,
			isImage: req.body.isImage,
		};
		imageModel.addImage(data, (err) => {
			if (err)
				return res
					.status(500)
					.json({ message: 'Mongo error', error: err });
			return res.json({ message: 'File Uploaded' });
		});
	});
};
