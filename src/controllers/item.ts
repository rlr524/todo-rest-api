import { Request, Response } from "express";
import ItemService from "../services/item";

class ItemController {
	static async createItem(req: Request, res: Response) {
		const { title, description, due, owner } = req.body;

		const newItem = await ItemService.createItem(
			title,
			description,
			due,
			owner
		);

		return res.status(200).json({ newItem });
	}
}

export default ItemController;
