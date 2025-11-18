import { Request, Response } from "express";
import { UserService } from "./user.service";

export const UserController = {
  async register(req: Request, res: Response) {
    try {
      const token = await UserService.register(req.body);
      res.json({ token });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const token = await UserService.login(req.body);
      res.json({ token });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const auth = req.headers.authorization;
      if (!auth) return res.status(401).json({ message: "No token" });

      const token = auth.replace("Bearer ", "");

      const user = await UserService.getMe(token);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  },
};