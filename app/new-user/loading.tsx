export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="bg-blue-400 flex items-center justify-center h-screen w-screen">
      <h1 className="text-2xl text-white">Loading...</h1>
      <p className="text-white">This may take a few seconds</p>
    </div>
  );
}
