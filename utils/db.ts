import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const createUser = async (
  email: string,
  name?: string | null,
  imageURL?: string | null
) => {
  const user = await prisma.user.create({
    data: {
      email,
      ...(name != null && { name }),
      ...(imageURL != null && { imageURL }),
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
