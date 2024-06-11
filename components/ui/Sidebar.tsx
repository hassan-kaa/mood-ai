"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import { BsArchive } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
const Sidebar = ({
  categories,
  setActiveCategory,
  activeCategory,
}: {
  categories: string[];
  setActiveCategory: Function;
  activeCategory: string;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className={`h-screen bg-slate-800 text-white flex flex-col p-1  ${
        showMenu ? "w-2/3 text-sm md:w-1/5 lg:w-1/6 md:text-lg  z-50 " : "w-16 "
      }  transition-all ease-in-out duration-200`}
    >
      <div
        className="p-4 hover:bg-slate-100/10 rounded-full cursor-pointer w-max "
        onClick={() => {
          setShowMenu((prev) => !prev);
        }}
      >
        {!showMenu ? <FiMenu size={24} /> : <IoClose size={24} />}
      </div>
      <div
        className={`flex w-full p-4 hover:bg-slate-100/10 gap-2 cursor-pointer ${
          activeCategory == "Notes" && "text-lime-200 bg-lime-100/25"
        }`}
        onClick={() => {
          setActiveCategory("Notes");
        }}
      >
        <FaRegLightbulb size={24} />
        {showMenu && <p>Notes</p>}
      </div>
      {categories.map((category) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={`flex w-full p-4 hover:bg-slate-100/10 gap-2 cursor-pointer ${
                  activeCategory == category && "text-lime-200 bg-lime-100/25"
                }`}
                onClick={() => {
                  setActiveCategory(category);
                }}
              >
                <MdLabelOutline size={24} />
                {showMenu && <p className="capitalize">{category}</p>}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 text-white">
              {category}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      <div
        className={`flex w-full p-4 hover:bg-slate-100/10 gap-2 cursor-pointer ${
          activeCategory == "Archive" && "text-lime-200 bg-lime-100/25"
        }`}
        onClick={() => {
          setActiveCategory("Archive");
        }}
      >
        <BsArchive size={24} />
        {showMenu && <p>Archive</p>}
      </div>
    </div>
  );
};

export default Sidebar;
