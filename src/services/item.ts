import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../interfaces/item";

const dynamodb = new DocumentClient();

class ItemService {
	static async createItem(
		title: string,
		description: string,
		due: Date,
		owner: string
	): Promise<Item> {
		const createdAt = new Date();
		const id = uuidv4();
		const completed = false;
		const deleted = false;
		const newItem = {
			id,
			title,
			description,
			due,
			owner,
			completed,
			deleted,
			createdAt,
		};

		await dynamodb
			.put({
				TableName: process.env.ITEM_TABLE!,
				Item: newItem,
			})
			.promise();

		return newItem;
	}
}

export default ItemService;
