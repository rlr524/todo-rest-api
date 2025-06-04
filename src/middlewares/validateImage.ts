/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import MulterRequest from "../types/multerRequest.js";
import validateImage from "../utils/validators/image.js";

const validateImageMiddleware: RequestHandler<
	Record<string, any>,
	any,
	MulterRequest
> = (req, res, next) => {
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
