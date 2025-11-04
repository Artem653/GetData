import { TagRepository } from "./tag.repository";

export const TagService = {
  async getAll(skip?: number, take?: number) {
    return TagRepository.getAll(skip, take);
  },

  async getById(id: number) {
    return TagRepository.getById(id);
  },
};
