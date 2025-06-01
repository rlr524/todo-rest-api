import { Request, Response } from "express";
import { logger } from "../utils/logger";

export function errorHandler(error: Error, req: Request, res: Response) {
	logger.error(`an error occurred: ${error}`);

	return res.status(500).json({
		error: {
			message: error.message,
			stack: process.env.NODE_ENV === "production" ? "" : error.stack,
		},
	});
}

process.on("uncaughtException", (error) => {
	logger.log("uncaughtException", error);
});
