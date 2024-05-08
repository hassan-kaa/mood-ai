import { calculateTextColor } from "@/app/(dashboard)/journal/[id]/page";
import { JournalEntry } from "@prisma/client";

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="divide-y h-full flex flex-col justify-between divide-gray-200 overflow-hidden rounded-lg bg-white shadow hover:bg-slate-50">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5 ">{entry.analysis.summary}</div>
      <div
        className="px-4 py-5 capitalize font-bold"
        style={{
          backgroundColor: entry.analysis.color,
          color: calculateTextColor(entry.analysis.color),
        }}
      >
        {entry.analysis.mood}
      </div>
    </div>
  );
};
export default EntryCard;
