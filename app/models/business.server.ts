import { Business, User } from "@prisma/client";
import { IBusinessInfo } from "~/types/business";
import bcrypt from "bcryptjs";
import { BUSINESS, BUSINESS_TEAM, FAVOURITE_USER, USER } from "./table";

export async function createBusiness({
  name,
  phone,
  // category,
  user_id,
}: {
  name: Business["name"];
  phone: Business["phone"];
  // category: Business["category_id"];
  user_id: User["id"];
}) {
  return BUSINESS.create({
    data: {
      name: name,
      phone: phone,
      // category_id: category,
      user_id,
    },
  });
}

export async function updateBusiness(businessInfoData: IBusinessInfo) {
  const {
    id,
    name,
    phone,
    category_id,
    subscription,
    email,
    website_url,
    owner_name,
    contact_number,
    tax_identification_number,
    operating_hours,
    payment_information,
    post_code,
    address,
    country,
    social_media_links,
  } = businessInfoData;

  return BUSINESS.update({
    where: {
      id: id,
    },
    data: {
      name,
      phone,
      category_id,
      subscription,
      email,
      website_url,
      owner_name,
      contact_number,
      tax_identification_number,
      operating_hours,
      payment_information,
      post_code,
      address,
      country,
    },
  });
}

export async function getBusinessTeamMembers(
  businessId: Business["id"],
  page: number,
  limit: number,
) {
  const skip = (page - 1) * limit;
  const [members, total] = await Promise.all([
    BUSINESS_TEAM.findMany({
      where: { business_id: businessId },
      include: {
        user: {
          include: { profile: true },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    BUSINESS_TEAM.count({
      where: { business_id: businessId },
    }),
  ]);
  return { members, total };
}

export async function addTeamMember(userData: any) {
  const { first_name, last_name, email, phone, created_by, business_id } =
    userData;
  const hashedPassword = await bcrypt.hash("password", 10);
  return USER.create({
    data: {
      email,
      force_password_change: true,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      profile: {
        create: {
          first_name,
          last_name,
          phone,
        },
      },
      businessTeam: {
        create: {
          business_id: business_id,
        },
      },
      role: { connect: { name: "teamUser" } },
    },
  });
}

export async function removeUserFromTeam(id: string) {
  return BUSINESS_TEAM.delete({
    where: {
      id,
    },
  });
}

// Favourit user

export async function getFavouriteUsers(
  businessId: Business["id"],
  page: number,
  limit: number,
) {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    FAVOURITE_USER.findMany({
      where: { business_id: businessId },
      include: {
        user: {
          include: { profile: true },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    FAVOURITE_USER.count({
      where: { business_id: businessId },
    }),
  ]);
  return { users, total };
}

export async function removeUserFromFavourite(id: string) {
  return FAVOURITE_USER.delete({
    where: {
      id,
    },
  });
}

export async function getFavouriteBusinesses(
  userId: User["id"],
  page: number,
  limit: number,
) {
  const skip = (page - 1) * limit;
  const [businesses, total] = await Promise.all([
    FAVOURITE_USER.findMany({
      where: { user_id: userId },
      include: {
        business: {
          include: { category: true },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    FAVOURITE_USER.count({
      where: { user_id: userId },
    }),
  ]);
  return { businesses, total };
}

export async function removeBusinessFromFavourite(id: string) {
  return FAVOURITE_USER.delete({
    where: {
      id,
    },
  });
}
