// import { getEntries } from "@/utils/api";
// import { prisma } from "@/utils/db";
import Hero from "@/components/ui/Hero";
export default async function Home() {
  return (
    <div className="absolute inset-0 -z-20 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="absolute -z-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-60"></div>
      <Hero />
    </div>
  );
}
