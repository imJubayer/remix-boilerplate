// profile.server.ts

import { PrismaClient, Profile } from "@prisma/client";
// import { Profile } from '../types/prisma';

const prisma = new PrismaClient();

export async function getProfile(userId: string): Promise<Profile | null> {
  return prisma.profile.findUnique({
    where: { userId },
  });
}

export async function updateUserProfile(
  userId: string,
  profileData: Profile,
): Promise<Profile> {
  return prisma.profile.update({
    where: { userId },
    data: profileData,
  });
}
