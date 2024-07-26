import type { Password, Profile, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { redirect } from "@remix-run/node";
import { serialize, parse } from "cookie";

import { IUser } from "~/types/authentication";
import { USER } from "./table";

export type { User } from "@prisma/client";

export function setTokenCookie(token: string) {
  return serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}

export const requireAuth = async (request: Request): Promise<IUser> => {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) {
    throw redirect("/login");
  }

  const cookies = parse(cookieHeader);
  const token = cookies.token;
  if (!token) {
    // throw redirect("/login");
  }

  try {
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(verifyUser.id);
    if (!user) {
      throw redirect("/login");
    }
    return user;
  } catch (error) {
    throw redirect("/login");
  }
};

export async function getUserById(id: User["id"]): Promise<IUser | null> {
  // @ts-ignore
  return USER.findUnique({
    where: { id },
    include: {
      profile: true,
      role: {
        include: { permissions: true },
      },
      business: {
        include: {
          category: true,
        },
      },
      favourites: true,
    },
  });
}

export async function getUserByEmail(email: User["email"]) {
  return USER.findUnique({
    where: { email },
    include: { profile: true, role: true },
  });
}

export async function createUser(
  email: User["email"],
  first_name: Profile["first_name"],
  last_name: Profile["last_name"],
  password: string,
  business_name?: string,
  business_number?: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const businessData =
    business_name && business_number
      ? {
          business: {
            create: {
              name: business_name,
              phone: business_number,
            },
          },
        }
      : {};
  const roleName = business_name && business_number ? "businessUser" : "user";
  return USER.create({
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
      role: { connect: { name: roleName } },
      ...businessData,
    },
  });
}

export async function adminRegister(userData: any) {
  const { first_name, last_name, email, gender, password, status, role } =
    userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  return USER.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      force_password_change: true,
      status: status ? "active" : "inactive",
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

  return USER.update({
    where: {
      id: userId,
    },
    data: {
      email,
      status: status ? "active" : "inactive",
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
  return USER.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await USER.findUnique({
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
//   return USER.findMany({
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
): Promise<{ users: User[]; total: number }> {
  const whereClause: any = {
    deletedAt: null,
    role: {
      name: {
        notIn: ["superadmin", "admin"],
      },
    },
    email: {
      contains: searchQuery,
    },
  };

  // if (searchQuery) {
  //   whereClause.OR = [
  //     { profile: { first_name: { contains: searchQuery } } },
  //     { profile: { last_name: { contains: searchQuery } } },
  //   ];
  // }

  if (page && limit) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      USER.findMany({
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
      USER.count({
        where: whereClause,
      }),
    ]);
    return { users, total };
  } else {
    const users = await USER.findMany({
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
  return USER.update({
    where: {
      id: userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

export async function changePassword(userId: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return USER.update({
    where: {
      id: userId,
    },
    data: {
      force_password_change: false,
      password: {
        update: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function statusToggle(id: string) {
  const user = await getUserById(id);
  return USER.update({
    where: {
      id,
    },
    data: {
      status: user?.status === "active" ? "inactive" : "active",
    },
  });
}
