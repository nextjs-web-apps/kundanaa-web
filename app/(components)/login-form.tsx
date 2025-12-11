'use client'

import { useState } from "react"
import { credentialLogin } from "../(actions)/logins"
import registerCredentials from "../(actions)/register"


const RegisterForm = () => {
    const [error, setError] = useState('')

    const handldSubmit = async (formData: FormData) => {
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            setError('passwords do not match')
        }

        const res = await registerCredentials({ name, email, password })
        if (res.error) {
            setError(res.error);
        }
        if (res.success) {
            setError(res.success)
        }
    }

    return (
        <form action={handldSubmit}>
            <h2 className="text-center">Register Form</h2>
            <input type="text"
                name="name"
                id="name"
                minLength={1}
                required
                placeholder="Enter your full name"
            />
            <input type="email"
                name="email"
                id="email"
                minLength={1}
                required
                placeholder="Enter your email"
            />
            <input type="password"
                name="password"
                id="password"
                minLength={6}
                required
                placeholder="•••••••••"
            />
            <input type="password"
                name="confrimPassword"
                id="confrimPassword"
                minLength={6}
                required
                placeholder="•••••••••"
            />
            <button type="submit">Register</button>
            <p className="text-red-500/30 text-center">{error}</p>
        </form>
    )
}

const LoginForm = () => {
    const [error, setError] = useState('')

    const handleLogin = async (formData: FormData) => {
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const res = await credentialLogin({ email, password })
            if (res.error) {
                setError(res.error)
            }
        } catch (error) {
            if (error) {
                console.error(error)
                throw new Error(`user do not exist ${error}`)
            }
        }
    }

    return (
        <form action={handleLogin}>
            <h2 className="text-center">Login Form</h2>
            <input type="email"
                name="email"
                id="email"
                minLength={1}
                required
                placeholder="Enter your email"
            />
            <input type="password"
                name="password"
                id="password"
                minLength={6}
                required
                placeholder="•••••••••"
            />
            <button type="submit">Login</button>
            {error && <p className="text-red-500/30 text-center">{error}</p>}
        </form>
    )
}

const LoginOrRegister = () => {
    const [login, setLogin] = useState(true)

    if (login) {
        return (
            <section className="max-w-[400px]">
                <LoginForm />
                <p className="text-center">Don&apos;t have account?
                    <span className="hover:text-blue-500/30 cursor-pointer"
                        onClick={() => setLogin(false)}>
                        &nbsp;Register here
                    </span>
                </p>
            </section>
        )
    } else {
        return (
            <section className="max-w-[400px]">
                <RegisterForm />
                <p className="text-center">Already registered?
                    <span className="hover:text-blue-500/30 cursor-pointer"
                        onClick={() => setLogin(true)}>
                        &nbsp;Login here
                    </span>
                </p>
            </section>
        )
    }
}

export default LoginOrRegister