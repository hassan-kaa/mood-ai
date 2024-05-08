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
