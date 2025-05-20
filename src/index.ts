import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import connectDB from "./db.js";
import ItemService from "./service/itemService.js";

export const handler = () => {
	const app = express();
	const port = process.env.PORT;
	app.use(cors());
	app.use(helmet());
	app.use(express.json());

	connectDB().catch((err) => console.error(err));

	app.get("/", (req, res) => {
		res.send("Hello, Madison");
	});

	app.get("/items", ItemService.getItems);
	app.get("/item/:id", ItemService.getItemById);
	app.post("/item", ItemService.createItem);
	app.patch("/item", ItemService.updateItem);

	app.listen(port, () => {
		console.log(`App listening on port ${port}`);
	});
};

handler();
