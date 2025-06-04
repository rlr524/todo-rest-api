import { RequestHandler, Response, NextFunction } from "express";
import MulterRequest from "../types/multerRequest.js";
import { errorHandler } from "./errorHandler.js";

const asyncMiddleware =
	<T>(
		fn: (
			req: MulterRequest,
			res: Response,
			next: NextFunction
		) => Promise<T>
	): RequestHandler =>
	(req, res, next) => {
		fn(req as MulterRequest, res, next).catch((error) => {
			return errorHandler(error, req, res);
		});
	};

export default asyncMiddleware;
