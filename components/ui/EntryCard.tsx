"use client";
import { calculateTextColor } from "@/utils/appearance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { JournalEntry } from "@/utils/types";
import { ArchiveIcon, PinIcon, PinOffIcon } from "lucide-react";
import { archiveEntry, pinEntry } from "@/utils/api";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const EntryCard = ({
  entry,
  onPinChange,
  onArchiveChange,
}: {
  entry: JournalEntry;
  onPinChange: Function;
  onArchiveChange: Function;
}) => {
  const [journalEntry, setJournalEntry] = useState<JournalEntry>(entry);
  const cardRef = useRef<HTMLDivElement>(null);
  const date = new Date(entry.createdAt).toDateString();
  const handlePin = async () => {
    const res = await pinEntry(journalEntry.id, !journalEntry.pinned);
    onPinChange(journalEntry.id, res.pinned);
    setJournalEntry(res);
  };
  const handleArchive = async () => {
    const res = await archiveEntry(journalEntry.id, !journalEntry.archived);
    onArchiveChange(journalEntry.id, res.archived);
    setJournalEntry(res);
  };
  const [hover, setHover] = useState(false);
  useEffect(() => {
    cardRef.current?.addEventListener("mouseenter", () => {
      setHover(true);
    });
    cardRef.current?.addEventListener("mouseleave", () => {
      setHover(false);
    });
  }, []);
  return (
    <Card
      ref={cardRef}
      className="rounded-xl overflow-clip transition-all duration-200 ease-in-out"
    >
      <CardHeader>
        <div className="flex justify-between items-center w-full h-8">
          <CardDescription>{date}</CardDescription>
          {(window.innerWidth < 640 || hover) && (
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                      onClick={handleArchive}
                    >
                      {journalEntry.archived == false ? (
                        <ArchiveIcon size={24} />
                      ) : (
                        ""
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 text-white">
                    {journalEntry.archived ? "Unarchive" : "Archive Note"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                      onClick={handlePin}
                    >
                      {journalEntry.pinned ? (
                        <PinOffIcon size={24} />
                      ) : (
                        <PinIcon size={24} />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 text-white">
                    {journalEntry.pinned ? "Unpin Note" : "Pin Note"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </CardHeader>
      <Link href={`/journal/${journalEntry.id}`}>
        <CardContent>
          <CardTitle className="mb-4 leading-normal text-lg lg:text-2xl">
            {journalEntry.analysis.summary}
          </CardTitle>
          <CardDescription>
            {journalEntry.content.length > 500
              ? `${journalEntry.content.slice(0, 500)}...`
              : journalEntry.content}
          </CardDescription>
        </CardContent>
        <CardFooter
          className=" p-4"
          style={{
            backgroundColor: journalEntry.analysis.color,
            color: calculateTextColor(journalEntry.analysis.color),
          }}
        >
          <p className="capitalize">{journalEntry.analysis.mood}</p>
        </CardFooter>
      </Link>
    </Card>
  );
};
export default EntryCard;
