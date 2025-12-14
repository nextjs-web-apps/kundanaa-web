'use server'

import * as z from 'zod'
import { AuthError } from "next-auth"

import { signIn } from "@/auth"
import { LoginSchema } from '@/schemas'
import { prisma } from '@/lib/prisma'

export const googleLogin = async () => {
    try {
        await signIn('google', { redirectTo: '/dashboard' })
    } catch (error) {
        if (error instanceof AuthError) {
            return 'google login failed'
        }
        throw error;
    }
}

export const credentialLogin = async (data: z.infer<typeof LoginSchema>) => {
    // validate and check credentials
    const validatedData = LoginSchema.parse(data)
    if (!validatedData) {
        return { error: "Invalid input data" };
    }
    const { email, password } = validatedData;
    const userExist = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!userExist || !userExist.password || !userExist.email) {
        return { error: "User not found" };
    }
    // sing in with credentials
    try {
        await signIn("credentials", {
            email: userExist.email,
            password: password,
            redirect: true,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Please confirm your email address" };
            }
        }
        throw error;
    }
    return { success: "User logged in successfully!" };
}