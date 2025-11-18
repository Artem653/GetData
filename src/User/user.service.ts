import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { RegisterDTO, LoginDTO } from "./user.types";
import { UserRepository } from "./user.repository";

export const UserService = {
  async register(data: RegisterDTO) {
    const existing = await UserRepository.findByEmail(data.email);
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await UserRepository.create({
      ...data,
      password: hashed,
    });

    return jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: "7d" });
  },

  async login(data: LoginDTO) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) throw new Error("Invalid email or password");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Invalid email or password");

    return jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: "7d" });
  },

  async getMe(token: string) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };
      return UserRepository.findById(decoded.id);
    } catch {
      throw new Error("Unauthorized");
    }
  },
};