import { Skeleton } from "./ui/skeleton";

export function SkeletonCard() {
  return (
    <div className=" bg-white space-y-5 rounded-lg  ">
      <div className="p-4 space-y-5">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-8 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-14 w-full rounded-t-none rounded-b-lg bg-slate-300" />
    </div>
  );
}
