"use client";
import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getEntries } from "@/utils/api";
import { useEffect, useState } from "react";
import { JournalEntry } from "@/utils/types";
import Sidebar from "@/components/Sidebar";
import { SkeletonCard } from "@/components/SkeletonCard";

const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [displayedEntries, setDisplayedEntries] = useState<JournalEntry[]>([]);
  const [columns, setColumns] = useState<number[]>();
  const [pinnedEntries, setPinnedEntries] = useState<JournalEntry[]>([]);
  const [otherEntries, setOtherEntries] = useState<JournalEntry[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Notes");

  const onPinChange = (id: string, pinned: boolean) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, pinned } : entry))
    );
  };
  const onArchiveChange = (id: string, archived: boolean) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, archived } : entry))
    );
  };
  const adjustColumns = (width: number) => {
    const num = width > 1280 ? 4 : width > 1024 ? 3 : width > 640 ? 2 : 1;
    const array: number[] = Array.from({ length: num }, (_, i) => i + 1);
    setColumns(array);
  };
  const extractCategories = (entries: JournalEntry[]) => {
    const aux: string[] = [];
    entries &&
      entries.map((entry) => {
        if (!aux.includes(entry.analysis.mood) && !entry.archived) {
          aux.push(entry.analysis.mood);
        }
      });
    setCategories(aux);
  };
  const fetchEntries = async () => {
    setLoading(true);
    const data = await getEntries();
    setEntries(data);
    extractCategories(data);
    setLoading(false);
  };
  useEffect(() => {
    adjustColumns(window.innerWidth);
    fetchEntries();
    const handleResize = () => {
      adjustColumns(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (displayedEntries) {
      if (activeCategory === "Archive") {
        setPinnedEntries(
          displayedEntries.filter((entry) => entry.pinned && entry.archived)
        );
        setOtherEntries(
          displayedEntries.filter((entry) => !entry.pinned && entry.archived)
        );
      } else {
        setPinnedEntries(
          displayedEntries.filter((entry) => entry.pinned && !entry.archived)
        );
        setOtherEntries(
          displayedEntries.filter((entry) => !entry.pinned && !entry.archived)
        );
      }
    }
  }, [displayedEntries]);

  useEffect(() => {
    if (activeCategory === "Notes") {
      setDisplayedEntries(entries);
    } else if (activeCategory === "Archive") {
      setDisplayedEntries(entries.filter((entry) => entry.archived == true));
    } else {
      setDisplayedEntries(
        entries.filter((entry) => entry.analysis.mood === activeCategory)
      );
    }
  }, [activeCategory]);

  useEffect(() => {
    setDisplayedEntries(entries);
  }, [entries]);
  return (
    <div className="flex gap-1 w-full h-screen  overflow-hidden">
      <Sidebar
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        categories={categories}
      />
      <div className="lg:p-10 p-2 bg-slate-50 h-full overflow-y-scroll hide-scrollbar w-full ">
        {activeCategory != "Archive" && (
          <div className="my-8 w-full flex justify-center items-center">
            <NewEntryCard />
          </div>
        )}
        {loading && (
          <div className="flex flex-col gap-2">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 lg:gap-8">
              {Array.from({ length: 10 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}
        {!entries && <div className="w-full text-center">No Data Found !</div>}
        {displayedEntries && (
          <div className="flex flex-col gap-2">
            {pinnedEntries && (
              <div className="flex-col flex gap-4 py-8">
                <h1 className="text-xl font-bold">Pinned</h1>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 lg:gap-8">
                  {columns?.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-8">
                      {pinnedEntries.map(
                        (entry, index) =>
                          entry.pinned &&
                          index % columns.length === colIndex && (
                            <EntryCard
                              key={entry.id}
                              entry={entry}
                              onPinChange={onPinChange}
                              onArchiveChange={onArchiveChange}
                            />
                          )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {otherEntries && (
              <div className="flex-col flex gap-4">
                <h1 className="text-xl font-bold">
                  {pinnedEntries && "Others"}
                </h1>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 lg:gap-8">
                  {columns?.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-8">
                      {otherEntries.map(
                        (entry, index) =>
                          !entry.pinned &&
                          index % columns.length === colIndex && (
                            <EntryCard
                              key={entry.id}
                              entry={entry}
                              onPinChange={onPinChange}
                              onArchiveChange={onArchiveChange}
                            />
                          )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
