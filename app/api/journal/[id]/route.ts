import { analyse } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

//PUT AND PATCH
//PUT MEANS REPLACE THE ENTIRE RESOURCE
//PATCH MEANS UPDATE THE RESOURCE
export const PATCH = async (req: Request, { params }) => {
  const { content } = await req.json();
  const user = await getUserByClerkId();
  const updatedEnrty = await prisma.journalEntry.update({
    where: {
      authorId_id: {
        id: params.id,
        authorId: user.id,
      },
    },
    data: {
      content,
    },
  });
  const analysis = await analyse(content);
  await prisma.analysis.update({
    where: {
      entryId: updatedEnrty.id,
    },
    data: {
      ...analysis,
    },
  });
  return NextResponse.json({ data: { ...updatedEnrty, analysis } });
};
export const DELETE = async (req: Request, { params }) => {
  const user = await getUserByClerkId();
  const deletedEntry = await prisma.journalEntry.delete({
    where: {
      authorId_id: {
        id: params.id,
        authorId: user.id,
      },
    },
  });
  return NextResponse.json({ data: deletedEntry });
};
