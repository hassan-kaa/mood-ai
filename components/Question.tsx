"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";

const Question = () => {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    console.log(value);
  };
  return (
    <div className="w-full lg:w-1/3">
      <form onSubmit={handleSumbit} className="w-full flex items-center">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Ask a question"
          className="w-full border border-black/10 px-4 py-2 text-lg rounded-l-lg "
        />
        <Button
          className="rounded-r-lg text-lg h-full rounded-l-none"
          variant="primary"
          type="submit"
        >
          Ask
        </Button>
      </form>
    </div>
  );
};
export default Question;
