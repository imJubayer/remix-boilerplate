// permissionsSeeder.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedUsers() {
  for (let i = 0; i < 100; i++) {
    const email = faker.internet.email();
    const pass = await bcrypt.hash("password", 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: {
          create: {
            hash: pass,
          },
        },
        profile: {
          create: {
            first_name: faker.internet.displayName(),
            last_name: faker.internet.displayName(),
          },
        },
        role: {
          connect: { name: "user" },
        },
      },
    });
  }

  const hashedPassword = await bcrypt.hash("password", 10);

  //Creating superadmin
  const superadmin = await prisma.user.create({
    data: {
      email: "super@admin.com",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      profile: {
        create: {
          first_name: "Super",
          last_name: "Admin",
        },
      },
      role: { connect: { name: "superadmin" } },
    },
  });

  //Creating superadmin
  const admin = await prisma.user.create({
    data: {
      email: "admin@admin.com",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      profile: {
        create: {
          first_name: "Admin",
          last_name: "User",
        },
      },
      role: { connect: { name: "admin" } },
    },
  });
}
