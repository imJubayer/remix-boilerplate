// profile.server.ts

import { PrismaClient } from "@prisma/client";
import { USER } from "./table";
// import { Profile } from '../types/prisma';

export async function getDashboard(): Promise<{
  totalUsers: number;
  totalBusinessUsers: number;
}> {
  const totalUsers = await USER.count({
    where: {
      deletedAt: null,
      role: {
        name: {
          notIn: ["superadmin", "admin"],
        },
      },
    },
  });
  const totalBusinessUsers = await USER.count({
    where: {
      deletedAt: null,
      role: {
        name: "businessUser",
      },
    },
  });

  return {
    totalUsers,
    totalBusinessUsers,
  };
}
