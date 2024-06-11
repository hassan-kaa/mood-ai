"use client";
import Editor from "@/components/ui/Editor";
import { getEntry } from "@/utils/api";
import { JournalEntry } from "@/utils/types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect, useState } from "react";
import { set } from "zod";

const EntryPage = ({ params }: { params: Params }) => {
  const [entry, setEntry] = useState<JournalEntry>({} as JournalEntry);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchEntry = async () => {
    setLoading(true);
    const data = await getEntry(params.id);
    setEntry(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchEntry();
  }, []);
  if (loading) return <div className="w-full h-full">Loading...</div>;
  return <div className="w-full h-full">{<Editor entry={entry} />}</div>;
};
export default EntryPage;
