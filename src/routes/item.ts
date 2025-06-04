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
router.get("/", ItemController.getAllItems);

// Get /items/:id
router.get("/:id", ItemController.getItemById);

// Post /items
router.post(
	"/",
	upload.array("images", 10),
	validateItem,
	addFileToRequest,
	validateMultipleImages,
	ItemController.createItem
);

// Patch /items
router.patch(
	"/",
	upload.array("images", 10),
	addFileToRequest,
	validateMultipleImages,
	ItemController.updateItem
);

// Delete /items
router.delete("/", ItemController.deleteItem);

export default router;
