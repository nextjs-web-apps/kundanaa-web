'use client'

import { useState } from "react"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { credentialLogin } from "@/actions/logins"
import GoogleSignIn from "@/components/google-signin"
import { LoginSchema, RegisterSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { credentialRegister } from "@/actions/register"

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        setLoading(true)
        credentialRegister(data).then((res) => {
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
                    <h2 className="text-center mt-5 mb-10">Register</h2>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="John Doe"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="johndoe@email.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="******"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="******"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-sm text-green-500 text-center">{success}</p>
                    <p className="text-sm text-red-500 text-center">{error}</p>
                    <Button type="submit" className="btn">{loading ? 'Registering...' : 'Register'}</Button>
                </form>
            </Form>
        </div>
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
        credentialLogin(data).then((res) => {
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
                                <FormLabel>Email</FormLabel>
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
                                <FormLabel>Password</FormLabel>
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