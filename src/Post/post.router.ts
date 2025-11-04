import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getById);
router.post("/posts", PostController.create);
router.patch("/posts/:id", PostController.update);
router.delete("/posts/:id", PostController.delete);

export default router;
