import winston from "winston";

export const logger = winston.createLogger({
	level: "error",
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "error.log" }),
	],
});

export const accesslogger = winston.createLogger({
	level: "info",
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "access.log"})
	]
})
