import { Item } from "./../interfaces/item";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import ImageMetadata from "../interfaces/imageMetadata";

const dynamodb = new DocumentClient();

class ItemService {
	static async createItem(
		title: string,
		description: string,
		due: Date,
		owner: string,
		images?: ImageMetadata[]
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
			images,
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

	static async getAllItems(): Promise<Item[]> {
		const result = await dynamodb
			.scan({
				TableName: process.env.ITEM_TABLE!,
			})
			.promise();

		return result.Items as Item[];
	}

	static async getItemById(id: string): Promise<Item | null> {
		const result = await dynamodb
			.get({
				TableName: process.env.ITEM_TABLE!,
				Key: { id },
			})
			.promise();

		if (!result.Item) {
			return null;
		}

		return result.Item as Item;
	}

	static async updateItem(
		tableName: string,
		key: { id: string },
		item: Partial<Item>,
		images?: ImageMetadata[]
	): Promise<Item | null> {
		const params = {
			TableName: tableName,
			Key: key,
			images: images,
			UpdateExpression:
				"set #title = :title, #description = :description, #due = :due, #owner = :owner, #completed = :completed, #images = :images",
			ExpressionAttributeNames: {
				"#title": "title",
				"#description": "description",
				"#due": "due",
				"#owner": "owner",
				"#completed": "completed",
				"#images": "images",
			},
			ExpressionAttributeValues: {
				":title": item.title ?? null,
				":description": item.description ?? null,
				":due": item.due ?? null,
				":owner": item.owner ?? null,
				":completed": item.completed ?? null,
				":images": item.images ?? null,
			},
		};

		const result = await dynamodb
			.update(params, function (err, data) {
				if (err) logger.error(err);
				else logger.info(data);
			})
			.promise();

		return result.$response.data as Item;
	}

	static async deleteItem(
		tableName: string,
		key: { id: string },
		item: Partial<Item>
	): Promise<Item | null> {
		const params = {
			TableName: tableName,
			Key: key,
			UpdateExpression: "set #deleted = :deleted",
			ExpressionAttributeNames: {
				"#deleted": "deleted",
			},
			ExpressionAttributeValues: {
				":deleted": (item.deleted = true),
			},
		};

		const result = await dynamodb
			.update(params, function (err, data) {
				if (err) logger.error(err);
				else logger.info(data);
			})
			.promise();

		return result.$response.data as Item;
	}
}

export default ItemService;
