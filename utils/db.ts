import { PrismaClient } from "@prisma/client";

const globbalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globbalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });
if (process.env.NODE_ENV !== "production") {
  globbalForPrisma.prisma = prisma;
}
export const createUser = async (email: string) => {
  const user = await prisma.user.create({
    data: {
      email: email,
    },
  });
  return user;
};
export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};
