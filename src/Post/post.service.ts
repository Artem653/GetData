import { PostRepository } from "./post.repository";

export const PostService = {
  async getAll() {
    return PostRepository.getAll();
  },

  async getById(id: number) {
    return PostRepository.getById(id);
  },

  async create(data: any) {
    return PostRepository.create(data);
  },

  async update(id: number, data: any) {
    return PostRepository.update(id, data);
  },

  async delete(id: number) {
    return PostRepository.delete(id);
  },
};
