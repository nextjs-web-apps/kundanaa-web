'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

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

export const credentialLogin = async ({ email, password }: { email: string, password: string }) => {
    try {
        await signIn('credentials', {
            email: email,
            password: password,
            redirect: true,
            redirectTo: '/dashboard'
        })
    } catch (error) {
        // return { error: `${error}` }
        if (error instanceof AuthError) {
            console.log('AuthError :', error.type)
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'invalid credentials' }
                case "CallbackRouteError":
                    return { error: 'no user found or invalid credentials' }
                default:
                    return { error: 'please confirm your email address' }
            }
        }
        throw error
    }
    return { success: 'user logged in successfully' }
}