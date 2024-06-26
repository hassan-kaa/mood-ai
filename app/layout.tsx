import "./globals.css";
import { Poppins } from "next/font/google";
import Provider from "./contexts/AuthContext";
import { Session, getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Mood-ai",
  description: "A journaling app that uses AI to analyze your mood.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getSession(options);
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
