'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { RegisterSchema } from '@/schemas'

// registerCredentials FOR PRISMA
export const credentialRegister = async (data: z.infer<typeof RegisterSchema>) => {
    // valildate and check credentials
    const validatedData = RegisterSchema.parse(data)
    if (!validatedData) {
        return { error: "Invalid input data" };
    }
    const { name, email, password, confirmPassword } = validatedData;
    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }
    try {
        const lowerCaseEmail = email.toLowerCase();
        const userExists = await prisma.user.findFirst({
            where: {
                email: lowerCaseEmail,
            },
        });
        if (userExists) {
            return { error: "Email already is in use. Please try another one." };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name: name,
                email: lowerCaseEmail,
                password: hashedPassword,
            },
        });
        return { success: "User created successfully " };
    } catch (error) {
        console.error("Database error:", error);
        if ((error as { code: string }).code === "ETIMEDOUT") {
            return {
                error: "Unable to connect to the database. Please try again later.",
            };
        } else if ((error as { code: string }).code === "503") {
            return {
                error: "Service temporarily unavailable. Please try again later.",
            };
        } else {
            return { error: "An unexpected error occurred. Please try again later." };
        }
    }
}