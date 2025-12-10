import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
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
  },
});
