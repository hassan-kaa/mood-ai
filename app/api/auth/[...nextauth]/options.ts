import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUser } from "@/utils/db";
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session }: { session: Session }) {
      const email = session?.user?.email;
      if (!email) return session;
      const sessionUser = await getUser(email);
      session.user.id = sessionUser?.id ?? undefined;
      return session;
    },
    async signIn({ user, profile }) {
      const email = (user?.email ?? (profile as { email?: string })?.email) as string | undefined;
      if (!email) return false;
      try {
        const userExists = await getUser(email);
        if (!userExists) {
          const name = (user?.name ?? (profile as { name?: string })?.name) ?? null;
          const image = (user?.image ?? (profile as { picture?: string })?.picture) ?? null;
          await createUser(email, name, image);
        }
        return true;
      } catch (error) {
        console.error("signIn callback error:", error);
        return false;
      }
    },
  },
};
