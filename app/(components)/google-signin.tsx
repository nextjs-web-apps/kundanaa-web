'use client'

import { useActionState } from "react"
import { googleLogin } from "../(actions)/logins"
import { FaGoogle } from "react-icons/fa"

const GoogleSignIn = () => {
    const [errorMsgGoogle, dispatchGoogle] = useActionState(googleLogin, undefined)
    return (
        <section className="max-w-[220px]">
            <form action={dispatchGoogle}>
                <button type="submit" className="flex items-center gap-3 px-5">
                    <FaGoogle />
                    Signin with Google
                </button>
            </form>
            <p>{errorMsgGoogle}</p>
        </section>
    )
}

export default GoogleSignIn