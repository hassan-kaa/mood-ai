import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

const Page = () => {
  return (
    <div className="w-full min-h-screen relative">
      <Image src={"/bg.png"} alt="bg" fill={true} className="absolute" />
      <div className="h-screen flex items-center justify-center">
        <SignUp afterSignInUrl={"/new-user"} redirectUrl={"/new-user"} />
      </div>
    </div>
  );
};

export default Page;
