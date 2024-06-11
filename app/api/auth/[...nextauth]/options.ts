import nextAuth, { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUser } from "@/utils/db";
export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await getUser(session?.user?.email as string);
      session.user.id = sessionUser?.id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        //check if the user already exists
        const userExists = await getUser(profile?.email as string);

        //if not connect to the database
        if (!userExists) {
          await createUser(profile?.email as string);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export default nextAuth(options);
