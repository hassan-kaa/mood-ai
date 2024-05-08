import { auth } from "@clerk/nextjs";
import Link from "next/link";
export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="font-bold text-6xl mb-4">
          The best Journal app , period.
        </h1>
        <p className="text-xl text-white/60 ">
          This is the best app for tracking your mood through out your life .
          All you have to do is be honest{" "}
        </p>
        <div className="my-4">
          <Link href={href}>
            <button className="rounded-xl px-4 py-2 bg-blue-500 text-xl">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
