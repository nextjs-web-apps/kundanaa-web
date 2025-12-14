import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedData = LoginSchema.parse(credentials);
        if (!validatedData) return null;

        const { email, password } = validatedData;

        const userFound = await prisma.user.findFirst({
          where: { email: email.toLowerCase() },
        });
        if (!userFound || !userFound.email || !userFound.password) return null;

        const passwordMatch = await bcrypt.compare(
          password,
          userFound.password
        );
        if (passwordMatch) return userFound;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
