import {Request, Response, NextFunction} from "express";
import createOrUpdateValidateItem from "../utils/validators/item";

export default function validateItem(req: Request, res: Response, next: NextFunction) {
    const { error } = createOrUpdateValidateItem(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message})
    }
    next()
}
