import { prisma } from "../core/prisma"; // ✅ імпорт клієнта Prisma
import { Prisma } from "@prisma/client";
import { CreatePost, UpdatePost, PostWithTags } from "./post.types";

export const PostRepository = {
  // === Отримати всі пости ===
  async getAll(): Promise<PostWithTags[]> {
    return prisma.post.findMany({
      include: { tags: { include: { tag: true } } },
    });
  },

  // === Отримати пост за ID ===
  async getById(id: number): Promise<PostWithTags | null> {
    return prisma.post.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });
  },

  // === Створити пост ===
  async create(data: CreatePost): Promise<PostWithTags> {
    try {
      const post = await prisma.post.create({
        data: {
          title: data.title,
          description: data.description,
          image: data.image,
          // Якщо є теги — додаємо зв’язки
          tags: data.tags
            ? {
                create: data.tags.map((tagName) => ({
                  tag: { create: { name: tagName } },
                })),
              }
            : undefined,
        },
        include: { tags: { include: { tag: true } } },
      });
      return post;
    } catch (error) {
      console.error("Error creating post:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new Error("Failed to create relation between Post and Tag");
        }
      }
      throw error;
    }
  },

  // === Оновити пост ===
  async update(id: number, data: UpdatePost): Promise<PostWithTags> {
    try {
      const post = await prisma.post.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          image: data.image,
        },
        include: { tags: { include: { tag: true } } },
      });
      return post;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  },

  // === Видалити пост ===
  async delete(id: number): Promise<PostWithTags> {
    try {
      const post = await prisma.post.delete({
        where: { id },
        include: { tags: { include: { tag: true } } },
      });
      return post;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },

  // === Отримати всі теги ===
  async getAllTags(skip = 0, take = 10) {
    try {
      const tags = await prisma.tag.findMany({
        skip,
        take,
        include: { posts: true },
      });
      return tags;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  },

  // === Отримати тег за ID ===
  async getTagById(id: number) {
    try {
      const tag = await prisma.tag.findUnique({
        where: { id },
        include: { posts: true },
      });
      return tag;
    } catch (error) {
      console.error("Error fetching tag by id:", error);
      throw error;
    }
  },
};
