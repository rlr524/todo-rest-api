import { Router } from "express";
import ItemController from "../controllers/item";
import validateItem from "../middlewares/validateItem";
import multer from "multer";
import addFileToRequest from "../middlewares/addFileToRequest";
import validateMultipleImages from "../middlewares/validateMultipleImages";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get /items
router.get("/items", ItemController.getAllItems);

// Get /item/:id
router.get("/item/:id", ItemController.getItemById);

// Post /item
router.post(
	"/item",
	upload.array("images", 10),
	validateItem,
	addFileToRequest,
	validateMultipleImages,
	ItemController.createItem
);

// Patch /item
router.patch(
	"/item",
	upload.array("images", 10),
	addFileToRequest,
	validateMultipleImages,
	ItemController.updateItem
);

// Delete /item
router.delete("/item/:id", ItemController.deleteItem);

export default router;
