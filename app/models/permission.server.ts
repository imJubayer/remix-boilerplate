import type { Permission } from "@prisma/client";

import { PERMISSION, ROLE } from "./table";

export async function getPermissions() {
  return PERMISSION.findMany({
    include: { roles: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPermission(permissionId: Permission["id"]) {
  return PERMISSION.findUnique({
    where: {
      id: permissionId,
    },
  });
}

export const addPermissionToRole = async (
  roleId: string,
  permissionId: string,
) => {
  const permission = await PERMISSION.findUnique({
    where: { id: permissionId },
    select: { id: true },
  });

  if (!permission) {
    throw new Error("Permission not found");
  }

  return await ROLE.update({
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
  const permission = await PERMISSION.findUnique({
    where: { id: permissionId },
    select: { id: true },
  });

  if (!permission) {
    throw new Error("Permission not found");
  }

  return await ROLE.update({
    where: { id: roleId },
    data: {
      permissions: {
        disconnect: { id: permission.id },
      },
    },
  });
};

// export async function addPermission(roleName: Permission["name"]) {
//   await PERMISSION.create({
//     data: {
//       name: roleName,
//     },
//   });
// }

// export async function updatePermission(roleId: Role["id"], roleName: Role["name"]) {
//   const existingRole = await PERMISSION.findUnique({
//     where: {
//       id: roleId,
//     },
//   });

//   if (!existingRole) {
//     throw new Error(`Role with id ${roleId} not found`);
//   }

//   await PERMISSION.update({
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
    await PERMISSION.deleteMany({
      where: {
        id: permissionId,
      },
    });
  }
}
