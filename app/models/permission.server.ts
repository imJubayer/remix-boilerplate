import type { Permission, Role } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getPermissions() {
  return prisma.permission.findMany({
    include: { roles: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPermission(permissionId: Permission["id"]) {
  return prisma.permission.findUnique({
    where: {
      id: permissionId,
    },
  });
}

export const addPermissionToRole = async (
  roleId: string,
  permissionId: string,
) => {
  const permission = await prisma.permission.findUnique({
    where: { id: permissionId },
    select: { id: true },
  });

  if (!permission) {
    throw new Error("Permission not found");
  }

  return await prisma.role.update({
    where: { id: roleId },
    data: {
      permissions: {
        connect: { id: permission.id },
      },
    },
  });
};

export const removePermissionFromRole = async (
  roleId: string,
  permissionId: string,
) => {
  const permission = await prisma.permission.findUnique({
    where: { id: permissionId },
    select: { id: true },
  });

  if (!permission) {
    throw new Error("Permission not found");
  }

  return await prisma.role.update({
    where: { id: roleId },
    data: {
      permissions: {
        disconnect: { id: permission.id },
      },
    },
  });
};

// export async function addPermission(roleName: Permission["name"]) {
//   await prisma.permission.create({
//     data: {
//       name: roleName,
//     },
//   });
// }

// export async function updatePermission(roleId: Role["id"], roleName: Role["name"]) {
//   const existingRole = await prisma.permission.findUnique({
//     where: {
//       id: roleId,
//     },
//   });

//   if (!existingRole) {
//     throw new Error(`Role with id ${roleId} not found`);
//   }

//   await prisma.permission.update({
//     where: {
//       id: roleId,
//     },
//     data: {
//       name: roleName,
//       // updatedAt: new Date(), // Optionally update updatedAt timestamp
//     },
//   });
// }

export async function deletePermission(permissionId: Permission["id"]) {
  if (permissionId) {
    await prisma.permission.deleteMany({
      where: {
        id: permissionId,
      },
    });
  }
}
