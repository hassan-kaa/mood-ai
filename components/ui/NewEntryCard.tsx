"use client";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";

const NewEntryCard = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const handleClick = async () => {
    const data = await createNewEntry(content);
    router.push(`/journal/${data.id}`);
  };
  return !modalOpen ? (
    <Button
      className="h-full shadow text-2xl"
      variant="outline"
      onClick={(e) => {
        setModalOpen(true);
      }}
    >
      New Entry
    </Button>
  ) : (
    <div className="z-10 w-full h-full bg-slate-400/20 z-1 absolute top-0 left-0 flex items-center justify-center">
      <div className="bg-white rounded-lg w-1/2 h-1/2 p-8 flex flex-col gap-8 items-center ">
        <h1 className="font-bold text-xl">Write what's on your mind</h1>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="w-full h-full p-8 text-xl outline-none"
        ></textarea>
        <div className="w-full flex justify-between">
          <Button onClick={handleClick}>Save</Button>
          <Button
            variant="destructive"
            onClick={(e) => {
              setModalOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NewEntryCard;
