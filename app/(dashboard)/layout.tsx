"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
];
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };
  return (
    <div className="relative">
      <div className="h-full">
        <header className="p-6  w-full  border-b border-black/10">
          <div className="w-full h-full flex items-center justify-between ">
            <Link href="/journal" className="flex gap-2 items-center">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/ios-filled/100/000000/brain.png"
                alt="logo"
              />
              <h1 className="text-lg  text-blue-900 rounded-lg ">Mood-AI</h1>
            </Link>
            <div className="flex gap-8 ">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  className="text-lg  hover:text-slate-500"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </div>

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="profile photo"
                      className="rounded-full w-8 h-8"
                    />
                  ) : (
                    <FaUser size={32} />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-56 mr-4 flex flex-col gap-2  p-4 bg-white">
                  <Link href={`/profile/${session.user?.id}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Button onClick={handleLogout}>Logout</Button>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              ""
            )}
          </div>
        </header>
        <div className="h-[calc(100vh-100px)]">{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
