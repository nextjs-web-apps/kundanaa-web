'use client'

import { useActionState } from "react"
import { FcGoogle } from "react-icons/fc"

import { googleLogin } from "@/actions/logins"
import { Button } from "./ui/button"

const GoogleSignIn = () => {
    const [errorMsgGoogle, dispatchGoogle] = useActionState(googleLogin, undefined)

    return (
        <section className="max-w-[220px] mx-auto">
            <form action={dispatchGoogle} className="border-0 shadow-none!">
                <Button type="submit" className="btn bg-blue-300! dark:bg-blue-500!">
                    <FcGoogle />
                    Signin with Google
                </Button>
            </form>
            <p>{errorMsgGoogle}</p>
        </section>
    )
}

export default GoogleSignIn