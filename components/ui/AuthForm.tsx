"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

const signupContent = {
  linkUrl: "/sign-in",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/sign-up",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Or enter your credentials to access your account",
  buttonText: "Sign In",
};
import { useSession, signIn } from "next-auth/react";
//form schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string(),
});
export default function AuthForm({ mode }: { mode: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("onsubmit");
  };
  const withGoogle = async () => {
    await signIn("google");
    router.push("/journal");
  };
  // if (session) router.push("/journal");
  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="flex items-center justify-center h-screen w-full">
        <Card className="w-[350px] md:w-1/2 max-w-[600px] z-10 ">
          <CardHeader className="gap-4">
            <Link
              href="/"
              className="flex w-full gap-4 justify-center items-center"
            >
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/ios-filled/100/000000/brain.png"
                alt="logo"
              />
              <h1 className="text-xl font-bold">Mood-ai</h1>
            </Link>
            <CardTitle>
              {mode == "sign-up" ? signupContent.header : signinContent.header}
            </CardTitle>

            <Button
              variant="outline"
              className="flex justify-center items-center gap-4 hover:bg-cyan-100"
              onClick={withGoogle}
            >
              <FaGoogle />
              <CardDescription className="capitalize">
                {mode} using Google
              </CardDescription>
            </Button>
            <CardDescription>
              {mode == "sign-up"
                ? signupContent.subheader
                : signinContent.subheader}
            </CardDescription>
          </CardHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {mode == "sign-in" && (
                  <Link
                    href={"/forgotPassword"}
                    className="underline text-xs text-blue-500"
                  >
                    Forgot Password ?
                  </Link>
                )}
                {error && (
                  <h1 className="text-red-500 font-bold text-sm text-center">
                    {error}
                  </h1>
                )}
              </CardContent>
              <CardFooter className="grid gap-4 ">
                <Button type="submit" className="w-full">
                  {mode == "sign-up"
                    ? signupContent.buttonText
                    : signinContent.buttonText}
                </Button>
                <h1 className="text-center text-sm font-thin w-full">
                  <Link
                    href={
                      mode == "sign-up"
                        ? signupContent.linkUrl
                        : signinContent.linkUrl
                    }
                  >
                    {mode == "sign-up"
                      ? signupContent.linkText
                      : signinContent.linkText}
                  </Link>
                </h1>
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
