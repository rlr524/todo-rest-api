import express from "express";
import "dotenv/config";
import connectDB from "./db.js";
import ItemService from "./service/itemService.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());

connectDB().catch((err) => console.error(err));

app.get("/", (req, res) => {
	res.send("Hello, Madison");
});

app.get("/items", ItemService.getItems);
app.post("/item", ItemService.createItem);
app.get("/item/:id", ItemService.getItemById);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
