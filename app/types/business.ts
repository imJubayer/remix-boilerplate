import { IUser } from "./authentication";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
}

export interface IBusinessInfo {
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
  category: ICategory;
}

export interface ITeamUser {
  id: string;
  user_id: string;
  business_id: string;
  business: IBusinessInfo;
  user: IUser;
}

export interface IFavouriteBusiness {
  id: string;
  user_id: string;
  business_id: string;
  business: IBusinessInfo;
  user: IUser;
}
