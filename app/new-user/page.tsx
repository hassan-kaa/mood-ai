import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
// const createNewUser = async () => {

//   redirect("/journal");
// };
const NewUser = async () => {
  // await createNewUser();
  return <Suspense fallback={<Loading />}>...Loading</Suspense>;
};
export default NewUser;
