export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  avatar: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
