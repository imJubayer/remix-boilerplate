import { User } from "@prisma/client";
import { USER_SECRET } from "./table";

export async function addUserSecret(
  userId: User["id"],
  secret: string,
  expiredAt: Date | null,
): Promise<any> {
  return await USER_SECRET.upsert({
    where: {
      userId,
    },
    update: {
      secret,
      expiredAt,
    },
    create: {
      userId,
      secret,
      expiredAt,
    },
  });
}

export async function getUserSecretByUserId(userId: string) {
  return await USER_SECRET.findUnique({
    where: { userId },
  });
}

export async function updateUserSecret(
  id: string,
  data: Partial<{ secret: string; expiredAt: Date | null }>,
) {
  return await USER_SECRET.update({
    where: { id },
    data,
  });
}

export async function deleteUserSecret(id: string) {
  return await USER_SECRET.delete({
    where: { id },
  });
}
