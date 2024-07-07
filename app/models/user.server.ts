import type { Password, Profile, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";
import { IUser } from "~/types/authentication";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]): Promise<IUser | null> {
  return prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      role: {
        include: { permissions: true },
      },
    },
  });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({
    where: { email },
    include: { profile: true, role: true },
  });
}

export async function createUser(
  email: User["email"],
  first_name: Profile["first_name"],
  last_name: Profile["last_name"],
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      profile: {
        create: {
          first_name,
          last_name,
        },
      },
      role: { connect: { name: "user" } },
    },
  });
}

export async function adminRegister(userData: any) {
  const { first_name, last_name, email, gender, password, status, role } =
    userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      status,
      profile: {
        create: {
          first_name,
          last_name,
          gender,
        },
      },
      role: { connect: { name: role } },
    },
  });
}

export async function updateUser(userId: string, userData: any) {
  const { first_name, last_name, email, gender, status, role } = userData;

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
      status,
      profile: {
        update: {
          first_name,
          last_name,
          gender,
        },
      },
      role: { connect: { name: role } },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

// export async function getAllUser(): Promise<IUser[]> {
//   return prisma.user.findMany({
//     where: {
//       deletedAt: null,
//       role: {
//         name: {
//           notIn: ["superadmin", "admin"],
//         },
//       },
//     },
//     include: {
//       role: true,
//       profile: true,
//     },
//   });
// }

export async function getAllUser(
  page?: number,
  limit?: number,
  searchQuery?: string,
): Promise<{ users: IUser[]; total: number }> {
  const whereClause: any = {
    deletedAt: null,
    role: {
      name: {
        notIn: ["superadmin", "admin"],
      },
    },
  };

  if (searchQuery) {
    whereClause.OR = [
      { profile: { first_name: { contains: searchQuery } } },
      { profile: { last_name: { contains: searchQuery } } },
    ];
  }

  if (page && limit) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        include: {
          role: true,
          profile: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.count({
        where: whereClause,
      }),
    ]);
    return { users, total };
  } else {
    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        role: true,
        profile: true,
      },
    });
    const total = users.length;
    return { users, total };
  }
}

export async function deleteUser(userId: string) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
