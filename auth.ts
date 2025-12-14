import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import User from "./app/(models)/User";
import { connectDB } from "./lib/connectDB";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (profile?.email_verified && profile?.email?.endsWith("@gmail.com")) {
          try {
            await connectDB();

            const foundUser = await User.findOne({ email: profile?.email });
            if (foundUser) return true;

            const newUser = new User({
              name: profile?.name,
              email: profile?.email,
              password: "password",
              provider: account?.provider,
              providerId: profile?.sub,
              image: profile?.picture,
            });

            await newUser.save();
          } catch (error) {
            console.error("error save google user:", error);
            return false;
          }
          return true;
        }
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
  ...authConfig,
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
