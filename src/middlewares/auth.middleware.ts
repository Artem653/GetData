import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }

    const payload = jwt.verify(token, env.JWT_SECRET) as { id: number };

    if (!payload || !payload.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    (req as any).userId = payload.id;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: "Unauthorized" });
  }
};