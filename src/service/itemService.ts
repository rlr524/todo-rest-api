import { Item } from "../model/item.js";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { logger } from "../logger.js";

const ItemService = {
	async getItems(req: Request, res: Response): Promise<void> {
		const items = await Item.find({});
		res.json(items);
	},

	async getItemById(req: Request, res: Response): Promise<void> {
		const id = new Types.ObjectId(req.params.id);

		try {
			const item = await Item.findById(id);

			if (!item) {
				res.json(`item with the id of ${id} not found`);
				return;
			}

			res.json(item);
		} catch (err: unknown) {
			if (err instanceof Error && err.name === "CastError") {
				res.json(`invalid id format`);
				logger.error(`invalid id format: ${err.message}`);
			} else {
				res.json(`an unknown error occurred`);
				if (err instanceof Error) {
					logger.error(`an unknown error occurred: ${err.message}`);
				} else {
					logger.error(
						`an unknown error occurred: ${JSON.stringify(err)}`
					);
				}
			}
		}
	},

	async createItem(req: Request, res: Response): Promise<void> {
		const body = req.body;

		const item = await Item.insertOne({
			title: body.title,
			description: body.description,
			due: body.due,
			complete: (body.complete = false),
			owner: (body.owner = "Rob"),
		});

		res.json(item);
	},

	async updateItem(req: Request, res: Response): Promise<void> {
		const id = req.body.id;
		const {title, description, due, complete, owner} = req.body;

		try {
			const item = await Item.findOneAndUpdate(
				{ _id: id },
				{
					title: title,
					description: description,
					due: due,
					complete: complete,
					owner: owner,
				},
				{new: true}
			);

			if (!item) {
				res.json(`item with the id of ${id} not found`);
				return;
			}

			res.json(item);
		} catch (err: unknown) {
			if (err instanceof Error && err.name === "CastError") {
				res.json(`invalid id format`);
				logger.error(`invalid id format: ${err.message}`);
			} else {
				res.json(`an unknown error occurred`);
				if (err instanceof Error) {
					logger.error(`an unknown error occurred: ${err.message}`);
				} else {
					logger.error(
						`an unknown error occurred: ${JSON.stringify(err)}`
					);
				}
			}
		}
	},
};

export default ItemService;
