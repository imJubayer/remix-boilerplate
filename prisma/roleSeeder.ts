// permissionsSeeder.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedRoles() {
  const roles = ["admin", "businessUser", "user"];
  for (const role of roles) {
    await prisma.role.create({
      data: {
        name: role,
        is_modifiable: false,
        // permissions: {
        //   connect: await prisma.permission.findMany({
        //     select: { id: true },
        //     where: { access: "any" },
        //   }),
        // },
      },
    });
  }

  await prisma.role.create({
    data: {
      name: "superadmin",
      is_modifiable: false,
      permissions: {
        connect: await prisma.permission.findMany({
          select: { id: true },
          where: { access: "any" },
        }),
      },
    },
  });
}
