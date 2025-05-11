import express from "express";
import "dotenv/config";
import connectDB from "./db.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());

connectDB().catch((err) => console.error(err));

app.get("/", (req, res) => {
	res.send("Hello, Madison");
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
