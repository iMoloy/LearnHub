import { prisma } from "../config/prisma.js";

export const userModel = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  },

  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  upsertGoogleAdmin(data: { name: string; email: string; googleId: string }) {
    return prisma.user.upsert({
      where: { email: data.email.toLowerCase() },
      update: {
        googleId: data.googleId,
        name: data.name,
      },
      create: {
        name: data.name,
        email: data.email.toLowerCase(),
        googleId: data.googleId,
        role: "ADMIN",
      },
    });
  },
};
