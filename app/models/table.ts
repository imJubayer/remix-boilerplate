import { prisma } from "~/db.server";

// USER
export const USER = prisma.user;
export const USER_SECRET = prisma.userSecret;
export const PROFILE = prisma.profile;

// AUTHENTICATION
export const ROLE = prisma.role;
export const PERMISSION = prisma.permission;

// BUSINESS
export const FAVOURITE_USER = prisma.favouriteUser;
export const BUSINESS_TEAM = prisma.businessTeam;
export const BUSINESS = prisma.business;
