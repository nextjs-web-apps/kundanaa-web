import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return !!(
          profile?.email_verified && profile?.email?.endsWith("@gmail.com")
        );
        /* // this commented section throws 'OAuthAccountNotLinked' error
        if (profile?.email_verified && profile?.email?.endsWith("@gmail.com")) {
          try {
            const foundUser = await prisma.user.findFirst({
              where: { email: profile?.email },
            });
            if (foundUser) return true;

            await prisma.user.create({
              data: {
                name: profile?.name || "",
                email: profile?.email,
                image: profile?.picture,
              },
            });

            return true;
          } catch (error) {
            console.error("error save google user:", error);
            return false;
          }
        } */
      }
      return true;
    },
  },
});
