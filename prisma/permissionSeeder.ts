// permissionsSeeder.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedPermissions() {
  const permissions = [
    // Permission
    "add-permission",
    "delete-permission",
    "edit-permission",
    "manage-permission-status",
    "view-permission",
    "view-permissions",
    "give-permission",
    "revoke-permission",
    "sync-permission",

    // Role
    "add-role",
    "delete-role",
    "edit-role",
    "manage-role-status",
    "view-role",
    "view-roles",
    "assign-role",
    "remove-role",

    // User
    "add-user",
    "delete-user",
    "edit-user",
    "manage-user-status",
    "view-user",
    "view-users",
  ];

  // const entities = ["user"];
  // const actions = ["create", "read", "update", "delete"];
  // const accesses = ["own", "any"] as const;

  // for (const entity of entities) {
  //   for (const action of actions) {
  //     for (const access of accesses) {
  //       await prisma.permission.create({ data: { entity, action, access } });
  //     }
  //   }
  // }
  for (const permission of permissions) {
    await prisma.permission.create({
      data: { entity: "user", action: permission, access: "any" },
    });
  }
}
