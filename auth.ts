import NextAuth, { DefaultSession } from "next-auth";

import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return !!(
          profile?.email_verified && profile?.email?.endsWith("@gmail.com")
        );
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
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
    } & DefaultSession["user"];
  }
}
