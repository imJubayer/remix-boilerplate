import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import { seedPermissions } from "./permissionSeeder";
import { seedRoles } from "./roleSeeder";
import { seedUsers } from "./userSeeder";

const prisma = new PrismaClient();

async function seed() {
  await seedPermissions();
  await seedRoles();
  await seedUsers();

  for (let i = 0; i < 50; i++) {
    await prisma.category.create({
      data: {
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
      },
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
