import { Request, Response } from "express";
import { TagService } from "./tag.service";

export const TagController = {
  async getAll(req: Request, res: Response) {
    try {
      const skip = Number(req.query.skip) || 0;
      const take = Number(req.query.take) || 10;
      const tags = await TagService.getAll(skip, take);
      res.json(tags);
    } catch {
      res.status(500).json({ message: "Error fetching tags" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const tag = await TagService.getById(id);
      if (!tag) return res.status(404).json({ message: "Tag not found" });
      res.json(tag);
    } catch {
      res.status(500).json({ message: "Error fetching tag" });
    }
  },
};
