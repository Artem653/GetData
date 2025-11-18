import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", UserController.me);

export default router;