import Editor from "@/components/ui/Editor";
import { analyse } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
const getEntry = async (id) => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.findUnique({
    where: {
      authorId_id: {
        authorId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });
  return entry;
};
export const calculateTextColor = (hexColor: string) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate brightness using the formula (0.299*R + 0.587*G + 0.114*B)
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Use white text for dark backgrounds and black text for light backgrounds
  return brightness > 0.5 ? "black" : "white";
};
const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  );
};
export default EntryPage;
