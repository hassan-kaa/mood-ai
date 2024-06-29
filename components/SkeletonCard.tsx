import { Skeleton } from "./ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 bg-white p-4 rounded-lg gap-3 ">
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-6 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-[50px] w-full rounded-xl" />
    </div>
  );
}
