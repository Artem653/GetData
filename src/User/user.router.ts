import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/me", authMiddleware, UserController.me);

export default router;