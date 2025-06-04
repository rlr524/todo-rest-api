import { Router } from "express";
import ItemController from "../controllers/item";
import validateItem from "../middlewares/validateItem";

const r = Router()


// Get all /items
