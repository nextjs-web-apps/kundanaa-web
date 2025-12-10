import { signIn } from "@/auth"

const GoogleSignIn = () => {
    const handleSubmit = async () => {
        'use server'
        await signIn('google', { redirectTo: '/dashboard' })
    }
    return (
        <form action={handleSubmit}>
            <button type="submit">Signin with Google</button>
        </form>
    )
}

export default GoogleSignIn