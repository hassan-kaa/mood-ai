import { analyse } from "@/utils/ai";
import { getUser, prisma } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

//PUT AND PATCH
//PUT MEANS REPLACE THE ENTIRE RESOURCE
//PATCH MEANS UPDATE THE RESOURCE
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(options);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const user = await getUser(session?.user?.email as string);
    const entry = await prisma.journalEntry.findUniqueOrThrow({
      where: {
        authorId: user?.id,
        id: params.id,
      },
      include: {
        analysis: true,
      },
    });
    console.log("entry", entry);
    return NextResponse.json({ data: entry });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch entry" },
      { status: 500 }
    );
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const newData = await req.json();

  const session = await getServerSession(options);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await getUser(session?.user?.email as string);
  try {
    const updatedEntry = await prisma.journalEntry.update({
      where: {
        authorId: user?.id,
        id: params.id,
      },
      data: {
        ...newData,
      },
      include: {
        analysis: true,
      },
    });
    if (newData.content) {
      const analysis = await analyse(newData.content);
      await prisma.analysis.update({
        where: {
          entryId: updatedEntry.id,
        },
        data: {
          ...analysis,
        },
      });
      return NextResponse.json({ data: { ...updatedEntry, analysis } });
    }
    return NextResponse.json({ data: updatedEntry });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
};
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(options);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await getUser(session?.user?.email as string);
  try {
    const deletedEntry = await prisma.journalEntry.delete({
      where: {
        authorId: user?.id,
        id: params.id,
      },
    });
    return NextResponse.json({ data: deletedEntry });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
};
