import { Request, Response } from "express";
import { PostService } from "./post.service";

export const PostController = {
  async getAll(_: Request, res: Response) {
    try {
      const posts = await PostService.getAll();
      res.json(posts);
    } catch {
      res.status(500).json({ message: "Error fetching posts" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const post = await PostService.getById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch {
      res.status(500).json({ message: "Error fetching post" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const newPost = await PostService.create(req.body);
      res.status(201).json(newPost);
    } catch {
      res.status(500).json({ message: "Error creating post" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updated = await PostService.update(id, req.body);
      res.json(updated);
    } catch {
      res.status(500).json({ message: "Error updating post" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deleted = await PostService.delete(id);
      res.json(deleted);
    } catch {
      res.status(500).json({ message: "Error deleting post" });
    }
  },
};

