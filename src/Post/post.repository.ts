import prisma from "../core/prisma";
import { PostRepositoryContract, CreatePost, UpdatePost } from "./post.types";

export const PostRepository: PostRepositoryContract = {
  async getAll() {
    return prisma.post.findMany({
      include: { tags: { include: { tag: true } } },
    });
  },

  async getById(id) {
    return prisma.post.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });
  },

  async create(data: CreatePost) {
    const { title, description, image, tags } = data;
    return prisma.post.create({
      data: {
        title,
        description,
        image,
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
      include: { tags: { include: { tag: true } } },
    });
  },

 async update(id: number, data: UpdatePost) {
  try {
    const { title, description, image, tags } = data;
    const updateData: any = {
      title,
      description,
      image,
    };

    if (tags && tags.length > 0) {
      updateData.tags = {
        deleteMany: {},
        create: tags.map((tag) => ({
          tag: {
            connectOrCreate: {
              where: { name: tag },
              create: { name: tag },
            },
          },
        })),
      };
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
      include: { tags: { include: { tag: true } } },
    });

    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
},

  async delete(id) {
    return prisma.post.delete({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });
  },
};


