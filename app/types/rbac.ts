import { IUser } from "./authentication";

export type RoleName = "user" | "admin" | "superadmin" | "businessuser";

export interface IRole {
  id: string;
  name: string;
  description: string;
  is_modifiable: boolean;
  users: IUser[];
  permissions: IPermission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPermission {
  id: string;
  entity: string; // E.g. user, admin.
  action: string; // E.g. create, read, update, delete
  access: string; // E.g. own or any
  description: string;
  roles: IRole[];
  createdAt: Date;
  updatedAt: Date;
}
