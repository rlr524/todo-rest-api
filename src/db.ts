import mongoose from "mongoose";
import "dotenv/config";
import { response } from "./awsSecrets.js";

const secrets: string = response.SecretString ?? "";
const secretValues = JSON.parse(secrets);
const user = secretValues.MONGO_DB_USER;
const password = secretValues.MONGO_DB_PASSWORD;


const DB_URL = `mongodb+srv://${user}:${password}@cluster0.jnsctan.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0`;

export default async function connectDB() {
	await mongoose.connect(DB_URL);
}
