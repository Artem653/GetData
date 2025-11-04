import { Tag } from "@prisma/client";

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostWithTags extends Post {
  tags: { tag: Tag }[];
}

export type CreatePost = {
  title: string;
  description: string;
  image: string;
  tags: string[];
};

export type UpdatePost = Partial<CreatePost>;

export interface PostRepositoryContract {
  getAll(): Promise<PostWithTags[]>;
  getById(id: number): Promise<PostWithTags | null>;
  create(data: CreatePost): Promise<PostWithTags>;
  update(id: number, data: UpdatePost): Promise<PostWithTags | null>;
  delete(id: number): Promise<PostWithTags | null>;
}