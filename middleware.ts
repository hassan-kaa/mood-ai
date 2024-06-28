import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
    error: "/",
  },
});
export const config = { matcher: ["/journal", "/journal/:path*"] };
