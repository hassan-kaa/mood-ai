import "./globals.css";
import { Poppins } from "next/font/google";
import Provider from "./contexts/AuthContext";
import { Session, getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

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
  const session: Session | null = await getServerSession(options);

  if (!session) {
    // Redirect to the login page if there's no session
    redirect("/api/auth/signin");
    return null; // Ensure no further rendering happens
  }

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
