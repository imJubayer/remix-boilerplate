import { IRole } from "./rbac";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password?: Password;
  role: IRole;
  // notes: Note[];
  profile?: Profile;
  status?: "active" | "inactive";
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  gender?: string;
  age?: number;
  birth?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export interface Password {
  hash: string;
  userId: string;
  user: IUser;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: IUser;
}
