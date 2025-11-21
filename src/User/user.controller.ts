import { Request, Response } from "express";
import { UserService } from "./user.service";

export const UserController = {
  async register(req: Request, res: Response) {
    try {
      const token = await UserService.register(req.body);
      res.json(token);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const token = await UserService.login(req.body);
      res.json(token);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const user = await UserService.me(userId);
      res.json(user);
    } catch (e: any) {
      res.status(401).json({ error: e.message });
    }
  },
};