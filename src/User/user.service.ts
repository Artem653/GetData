import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository";
import { RegisterDTO, LoginDTO } from "./user.types";
import { env } from "../config/env";

export const UserService = {
  async register(data: RegisterDTO) {
    const exists = await UserRepository.findByEmail(data.email);
    if (exists) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await UserRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, env.JWT_SECRET);

    return { token };
  },

  async login(data: LoginDTO) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }

    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) {
      throw new Error("Password incorrect");
    }

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET);

    return { token };
  },

  async me(id: number) {
    return UserRepository.findById(id);
  }
};