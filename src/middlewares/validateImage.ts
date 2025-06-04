import { RequestHandler } from "express";
import MulterRequest from "../types/multerRequest";
import validateImage from "../utils/validators/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateImageMiddleware: RequestHandler<Record<string, any>, any, MulterRequest> = (req, res, next) => {
	if (req.file) {
		const { error } = validateImage(req.file);
		if (error) {
			res.status(400).json({ error });
			return;
		}
	}
	next();
};

export default validateImageMiddleware;
