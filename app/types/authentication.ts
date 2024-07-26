import { ICategory } from "./business";
import { IRole } from "./rbac";

export interface IUser {
  id: string;
  email: string;
  force_password_change: boolean;
  createdAt: Date;
  updatedAt: Date;
  password?: Password;
  role: IRole;
  // notes: Note[];
  profile?: Profile;
  status?: "active" | "inactive";
  business?: IBusiness;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  gender?: string;
  age?: number;
  birth?: Date;
  address?: string;
  user_id: string;
  profile_image: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
interface IBusiness {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  category_id: string;
  subscription?: string;
  email: string;
  website_url?: string;
  owner_name?: string;
  contact_number?: string;
  tax_identification_number?: string;
  operating_hours?: string;
  payment_information?: string;
  post_code?: string;
  address?: string;
  country?: string;
  social_media_links?: JSON;
  category?: ICategory;
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
