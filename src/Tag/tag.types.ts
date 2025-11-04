export interface Tag {
  id: number;
  name: string;
}

export interface TagRepositoryContract {
  getAll(skip?: number, take?: number): Promise<Tag[]>;
  getById(id: number): Promise<Tag | null>;
}
