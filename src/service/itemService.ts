import { Item } from "../model/item.js";
import { Request, Response } from "express";

const ItemService = {
    async getItems(req: Request, res: Response) {
        const items = await Item.find({})
        res.json(items)
    }
}

export default ItemService;