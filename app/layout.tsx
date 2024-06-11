import "./globals.css";
import { Poppins } from "next/font/google";
import Provider from "./contexts/AuthContext";
const poppins = Poppins({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});
export const metadata = {
  title: "Mood-ai",
  description: "A journaling app that uses AI to analyze your mood.",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
