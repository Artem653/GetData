import prisma from "../core/prisma";
import { RegisterDTO } from "./user.types";

export const UserRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async create(data: RegisterDTO) {
    return prisma.user.create({
      data,
    });
  },

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        email: true,
        avatar: true,
        isAdmin: true,
      },
    });
  },
};