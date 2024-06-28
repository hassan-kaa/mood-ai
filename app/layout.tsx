import "./globals.css";
import { Poppins } from "next/font/google";
import Provider from "./contexts/AuthContext";
import { Session } from "next-auth";
import { ReactNode } from "react";

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Mood-ai",
  description: "A journaling app that uses AI to analyze your mood.",
};

interface RootLayoutProps {
  children: ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
