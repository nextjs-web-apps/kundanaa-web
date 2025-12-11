import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  // pages: {
  //   signIn: "/",
  // },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // console.log("Google Profile :", profile);
        return !!(
          profile?.email_verified && profile?.email?.endsWith("@gmail.com")
        );
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});

// Extend the Session type to include the user ID
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
