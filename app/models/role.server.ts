import type { Role } from "@prisma/client";

import { ROLE } from "./table";

export async function getRoles(page?: number, limit?: number) {
  const [roles, total] = await Promise.all([
    ROLE.findMany({
      where: {
        name: {
          notIn: ["superadmin"],
        },
      },
      include: { permissions: true },
      orderBy: { updatedAt: "desc" },
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit || undefined,
    }),
    ROLE.count({
      where: {
        name: {
          notIn: ["superadmin"],
        },
      },
    }),
  ]);
  return { roles, total };
}

export async function getRole(roleId: Role["id"]) {
  return ROLE.findUnique({
    where: {
      id: roleId,
    },
  });
}

export async function addRole(
  roleName: Role["name"],
  description?: Role["description"],
) {
  await ROLE.create({
    data: {
      name: roleName,
      description: description,
    },
  });
}

export async function updateRole(roleId: Role["id"], roleName: Role["name"]) {
  const existingRole = await ROLE.findUnique({
    where: {
      id: roleId,
    },
  });

  if (!existingRole) {
    throw new Error(`Role with id ${roleId} not found`);
  }

  await ROLE.update({
    where: {
      id: roleId,
    },
    data: {
      name: roleName,
      // updatedAt: new Date(), // Optionally update updatedAt timestamp
    },
  });
}

export async function deleteRole(roleId: Role["id"]) {
  if (roleId) {
    await ROLE.deleteMany({
      where: {
        id: roleId,
      },
    });
  }
}
