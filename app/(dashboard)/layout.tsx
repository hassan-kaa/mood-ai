import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
];
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
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
              <h1 className="font-bold text-lg  text-blue-900 rounded-lg ">
                Mood-AI
              </h1>
            </Link>
            <div className="flex gap-8 ">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  className="text-lg font-semibold hover:text-slate-500"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </div>
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-64px)]">{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
