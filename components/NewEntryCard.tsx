"use client";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
//import { Caveat } from "next/font/google";
import { Textarea } from "./ui/textarea";
//const caveat = Caveat({ subsets: ["latin"] });
const NewEntryCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleClick = async () => {
    setLoading(true);
    const data = await createNewEntry(content);
    setLoading(false);
    router.push(`/journal/${data.id}`);
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [content]);

  return (
    <>
      <div className="shadow w-full lg:w-1/2 p-4 bg-white rounded-md ">
        <Textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          ref={textareaRef}
          className={`resize-none border-none focus:border-none focus-within:outline-none`}
          placeholder="Write something ..."
        />
        <Button onClick={handleClick}>Save</Button>
      </div>

      {loading && (
        <div className="w-full h-full bg-slate-400/50 z-1 absolute top-0 left-0 text-white flex items-center justify-center">
          Saving ...
        </div>
      )}
    </>
  );
};
export default NewEntryCard;
