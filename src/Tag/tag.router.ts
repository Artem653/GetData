import express from "express";
import { TagController } from "./tag.controller";

const router = express.Router();

router.get("/tags", TagController.getAll);
router.get("/tags/:id", TagController.getById);

export default router;
