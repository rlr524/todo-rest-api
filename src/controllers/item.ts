import { Request, Response } from "express";
import ItemService from "../services/item.js";
import { accessLogger } from "../utils/logger.js";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import MulterRequest from "../types/multerRequest.js";
import ImageMetadata from "../interfaces/imageMetadata.js";
import ImageService from "../services/image.js";

class ItemController {
	static createItem = asyncMiddleware(
		async (req: MulterRequest, res: Response) => {
			const { title, description, due, owner } = req.body;

			let images: ImageMetadata[] | undefined;

			if (req.files) {
				images = await ImageService.uploadMultipleImages(req.files);
			}

			const newItem = await ItemService.createItem(
				title,
				description,
				due,
				owner,
				images
			);

			accessLogger.info(`createItem invoked from: ${req.host}`);

			return res.status(200).json({ newItem });
		}
	);

	static getItemById = asyncMiddleware(
		async (req: Request, res: Response) => {
			const id = req.params.id;
			const item = await ItemService.getItemById(id);

			if (!item) {
				return res.status(404).json({ error: "item not found" });
			}

			accessLogger.info(
				`getItemBy invoked from: ${req.host} with id ${id}`
			);

			return res.status(200).json({ item });
		}
	);

	static getAllItems = asyncMiddleware(
		async (req: Request, res: Response) => {
			const items = await ItemService.getAllItems();

			accessLogger.info(`getAllItems invoked from: ${req.host}`);

			return res.status(200).json({ items });
		}
	);

	static updateItem = asyncMiddleware(
		async (req: MulterRequest, res: Response) => {
			const itemBody = req.body;
			const id = req.body.id;
			const table = process.env.ITEM_TABLE!;

			const item = await ItemService.getItemById(id);
			if (!item) return res.status(404).json({ error: "item not found" });

			let images: ImageMetadata[] = [];
			if (req.files) {
				images = await ImageService.updateMultipleImages(
					req.files,
					item.images || []
				);
			}

			const updatedItem = await ItemService.updateItem(
				table,
				{ id },
				itemBody,
				images
			);

			accessLogger.info(
				`updateItem invoked from: ${req.host} with id ${id}`
			);

			return res.status(200).json({ updatedItem });
		}
	);

	static deleteItem = asyncMiddleware(async (req: Request, res: Response) => {
		const itemBody = {};
		const id = req.params.id;
		const table = process.env.ITEM_TABLE!;

		const item = await ItemService.getItemById(id);
		if (!item) return res.status(404).json({ error: "item not found" });

		const updatedItem = await ItemService.deleteItem(
			table,
			{ id },
			itemBody
		);

		accessLogger.info(`deleteItem invoked from: ${req.host} with id ${id}`);

		return res.status(200).json({ updatedItem });
	});
}

export default ItemController;
