import { analyse } from "@/utils/ai";
import { getUser, prisma } from "@/utils/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(options);
  console.log("session in GET", session);
  if (!session) throw new Error("No session");
  try {
    const user = await getUser(session?.user?.email as string);
    const entries = await prisma.journalEntry.findMany({
      where: {
        authorId: user?.id as string,
      },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      include: {
        analysis: true,
      },
    });
    return NextResponse.json({ data: entries });
  } catch (err) {
    console.log("error in GET because of session");
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(options);
  console.log("session in POST", session);
  const { content } = await req.json();
  if (!session) throw new Error("No session");
  try {
    const user = await getUser(session?.user?.email as string);
    const journal = await prisma.journalEntry.create({
      data: {
        authorId: user?.id as string,
        content,
      },
    });
    const analysis = await analyse(content).then((res) => res);
    if (analysis)
      await prisma.analysis.create({
        data: {
          entryId: journal.id,
          ...analysis,
        },
      });
    else console.log("No analysis");

    revalidatePath("/journal");
    return NextResponse.json({ data: journal });
  } catch (err) {
    console.log(err);
  }
};
