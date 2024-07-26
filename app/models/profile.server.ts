// profile.server.ts

import { PrismaClient, Profile } from "@prisma/client";
import { uploadFile } from "~/utils/helper.server";
import { PROFILE } from "./table";
// import { Profile } from '../types/prisma';

const prisma = new PrismaClient();

export async function getProfile(user_id: string): Promise<Profile | null> {
  return PROFILE.findUnique({
    where: { user_id },
  });
}

export async function updateUserProfile(profileData: any): Promise<Profile> {
  let imageFilePath = "";
  const { user_id, profile_image } = profileData;
  let data: any = {
    first_name: profileData.first_name,
    last_name: profileData.last_name,
    phone: profileData.phone,
    gender: profileData.gender,
    address: profileData.address,
  };
  if (profile_image.size) {
    imageFilePath = await uploadFile(profile_image, "profile");
    data.profile_image = imageFilePath;
  }
  return PROFILE.update({
    where: { user_id: user_id },
    data,
  });
}
