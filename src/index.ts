import serverless from "serverless-http";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req: Request, res: Response) {
	res.send("Welcome to the ToDo API");
});

export const handler = serverless(app);
