"use client";

import { useEffect, useState } from "react";
import { deleteEntry, updateEntry } from "@/utils/api";
//import { useAutosave } from "react-autosave";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { JournalEntry } from "@/utils/types";

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const router = useRouter();
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [edited, setEdited] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(entry);
  //Autosave
  // useAutosave({
  //   data: value,
  //   onSave: async (_value) => {
  //     setIsLoading(true);
  //     await updateEntry(entry.id, _value);
  //     setIsLoading(false);
  //   },
  // });
  const handleDelete = async () => {
    await deleteEntry(entry.id);
    router.push("/journal");
  };
  const handleUpdate = async () => {
    setIsLoading(true);
    const updatedEntry = await updateEntry(entry.id, value);
    setCurrentEntry(updatedEntry);
    setIsLoading(false);
  };
  useEffect(() => {
    if (value !== currentEntry.content) setEdited(true);
    else setEdited(false);
  }, [value]);

  return (
    <div className="w-full h-full  grid lg:grid-cols-3 px-4">
      {isLoading && (
        <div className="w-full h-full bg-slate-400/50 z-1 absolute top-0 left-0 text-white flex items-center justify-center">
          Loading
        </div>
      )}
      <div className="h-full py-10 lg:col-span-2">
        <div className="h-full flex-col flex gap-8">
          <textarea
            className="w-full h-full p-8 text-xl outline-none"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></textarea>
          <Button disabled={!edited} onClick={handleUpdate}>
            Save
          </Button>
        </div>
      </div>

      <div className="lg:border-l border-black ">
        <div
          className=" px-6 py-10"
          // style={{
          //   backgroundColor: currentEntry.analysis.color,
          //   color: calculateTextColor(currentEntry.analysis.color),
          // }}
        >
          <h2 className="font-bold text-xl">Analysis</h2>
        </div>
        <div className="">
          <ul role="list" className="divide-y divide-gray-200">
            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold w-1/3">Subject</div>
              <div className="text-xl">{currentEntry.analysis?.subject}</div>
            </li>

            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold">Mood</div>
              <div className="text-xl">{currentEntry.analysis?.mood}</div>
            </li>

            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold">Negative</div>
              <div className="text-xl">
                {currentEntry.analysis?.negative ? "True" : "False"}
              </div>
            </li>
            <li className="py-4 px-8 flex items-center justify-between">
              <button
                onClick={handleDelete}
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Editor;
