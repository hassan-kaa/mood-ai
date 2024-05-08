import { analyse } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { content } = await req.json();
  const user = await getUserByClerkId();
  const journal = await prisma.journalEntry.create({
    data: {
      authorId: user.id,
      content,
    },
  });
  const analysis = await analyse(content);
  await prisma.analysis.create({
    data: {
      entryId: journal.id,
      ...analysis,
    },
  });

  revalidatePath("/journal");
  return NextResponse.json({ data: journal });
};
