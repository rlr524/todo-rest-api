import { Item } from "../model/item.js";
import { Request, Response } from "express";

const ItemService = {
	async getItems(req: Request, res: Response): Promise<void> {
		const items = await Item.find({});
		res.json(items);
	},

	async getItemById(req: Request, res: Response): Promise<void> {
		const id = req.params.id;

		try {
			const item = await Item.findById(id);

			if (!item) {
				throw new Error("item not found");
			}

			res.json(item);
			/* eslint-disable @typescript-eslint/no-explicit-any */
		} catch (err: any) {
			if (err.name === "CastError") {
				res.json(`item not found or invalid id format`);
			}
			if (err.name === "item not found") {
				res.json(`item not found`);
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
};

export default ItemService;
