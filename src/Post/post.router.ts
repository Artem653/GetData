import { Router } from "express";
import { PostController } from "./post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getById);

router.post("/posts", authMiddleware, PostController.create);
router.put("/posts/:id", authMiddleware, PostController.update);
router.delete("/posts/:id", authMiddleware, PostController.delete);

export default router;
