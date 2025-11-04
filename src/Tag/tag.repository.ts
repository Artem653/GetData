import prisma from "../core/prisma";
import { TagRepositoryContract } from "./tag.types";

export const TagRepository: TagRepositoryContract = {
  async getAll(skip = 0, take = 10) {
    return prisma.tag.findMany({
      skip,
      take,
    });
  },

  async getById(id) {
    return prisma.tag.findUnique({ where: { id } });
  },
};
