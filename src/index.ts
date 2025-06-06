import serverless from "serverless-http";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/item";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req: Request, res: Response) {
	res.send("Welcome to the ToDo API");
});

app.use(router);

export const handler = serverless(app);
