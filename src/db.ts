import mongoose from "mongoose";
import "dotenv/config";

const DB_URL = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.jnsctan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export default async function connectDB() {
	await mongoose.connect(DB_URL);
}
