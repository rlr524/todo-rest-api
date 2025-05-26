import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import connectDB from "./db.js";
import ItemService from "./service/itemService.js";

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
app.delete("/item/:id", ItemService.deleteItem);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

export const handler = serverless(app);
