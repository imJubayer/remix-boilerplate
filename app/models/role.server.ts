import type { Role } from "@prisma/client";

import { prisma } from "~/db.server";
import { IRole } from "~/types/rbac";

export async function getRoles(): Promise<IRole[]> {
  return prisma.role.findMany({
    where: {
      name: {
        notIn: ["superadmin"],
      },
    },
    include: { permissions: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getRole(roleId: Role["id"]) {
  return prisma.role.findUnique({
    where: {
      id: roleId,
    },
  });
}

export async function addRole(roleName: Role["name"]) {
  await prisma.role.create({
    data: {
      name: roleName,
    },
  });
}

export async function updateRole(roleId: Role["id"], roleName: Role["name"]) {
  const existingRole = await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  });

  if (!existingRole) {
    throw new Error(`Role with id ${roleId} not found`);
  }

  await prisma.role.update({
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
    await prisma.role.deleteMany({
      where: {
        id: roleId,
      },
    });
  }
}
