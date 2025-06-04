const validateImage = (file: Express.Multer.File) => {
	if (!file.mimetype.startsWith("image/")) {
		return { error: "Invalid image file" };
	}
	if (file.size > 1000000) {
		return { error: "Image file is too large" };
	}
	return { error: null };
};

export default validateImage;
