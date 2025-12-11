import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectDB } from "./lib/connectDB";
import User from "./app/(models)/User";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        await connectDB();

        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) {
          throw new Error("missing email or password");
        }

        const foundUser = await User.findOne({
          email: email,
        })
          .select("+password")
          .exec();
        if (!foundUser) {
          throw new Error("no user found");
        }

        const isValid = await bcrypt.compare(password, foundUser.password!);
        if (!isValid) {
          throw new Error("invalid password");
        }

        return foundUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
