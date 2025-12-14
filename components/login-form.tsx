'use client'

import { useState } from "react"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { prismaLogin } from "@/actions/logins"
import GoogleSignIn from "@/components/google-signin"
import { LoginSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const RegisterForm = () => {
    const [error, setError] = useState('')

    const handldSubmit = async (formData: FormData) => {
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            setError('passwords do not match...try again')
            return
        }
    }

    return (
        <form action={handldSubmit}>
            <h2 className="text-center mt-5 mb-10">Register</h2>
            <input type="text"
                name="name"
                id="name"
                minLength={1}
                autoComplete="off"
                required
                placeholder="Enter your full name"
            />
            <input type="email"
                name="email"
                id="email"
                minLength={1}
                autoComplete="off"
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
                name="confirmPassword"
                id="confirmPassword"
                minLength={6}
                required
                placeholder="•••••••••"
            />
            <button type="submit">Register</button>
            <p className="text-sm text-red-500 text-center">{error}</p>
        </form>
    )
}

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setLoading(true)
        prismaLogin(data).then((res) => {
            if (res.error) {
                setLoading(false)
                setSuccess('')
                setError(res.error)
            }
            if (res.success) {
                setLoading(false)
                setError('')
                setSuccess(res.success)
            }
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <h2 className="text-center mt-5 mb-10">Log in to your account</h2>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="outline-none">
                                {/* <FormLabel>Email</FormLabel> */}
                                <FormControl>
                                    <Input {...field}
                                        className="intake"
                                        placeholder="johndoe@email.com"
                                        type="email"
                                    />
                                </FormControl>
                                {/* <FormDescription className="text-[12px] text-gray-400">
                                    This is your personal email address.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Password</FormLabel> */}
                                <FormControl>
                                    <Input {...field}
                                        className="intake"
                                        placeholder="* * * * * *"
                                        type="password"
                                    />
                                </FormControl>
                                {/* <FormDescription className="text-[12px] text-gray-400">
                                    This is your password to your provided email address.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-sm text-green-500 text-center">{success}</p>
                    <p className="text-sm text-red-500 text-center">{error}</p>
                    <Button className="btn" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
                </form>
            </Form>
        </div>
    )
}

const LoginOrRegister = () => {
    const [login, setLogin] = useState(true)

    if (login) {
        return (
            <section className="max-w-[400px] w-full">
                <LoginForm />
                <p className="text-center mt-5">Don&apos;t have account?
                    <span className="font-semibold hover:text-blue-500 text-themebg cursor-pointer"
                        onClick={() => setLogin(false)}>
                        &nbsp;Register here
                    </span>
                </p>
                <GoogleSignIn />
            </section>
        )
    } else {
        return (
            <section className="max-w-[400px] w-full">
                <RegisterForm />
                <p className="text-sm text-center mt-5">Already registered?
                    <span className="font-semibold hover:text-blue-500 text-themebg cursor-pointer"
                        onClick={() => setLogin(true)}>
                        &nbsp;Login here
                    </span>
                </p>
            </section>
        )
    }
}

export default LoginOrRegister