import { analyse } from "@/utils/ai";
import { getUser, prisma } from "@/utils/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(options);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(options);
  const { content } = await req.json();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
};
