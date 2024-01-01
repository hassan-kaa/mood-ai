import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full min-h-screen relative">
      <Image src={"/bg.png"} alt="bg" fill={true} className="absolute" />
      <div className="h-screen flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}
