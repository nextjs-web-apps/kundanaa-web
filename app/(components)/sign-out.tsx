'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"

const SignOut = () => {
    return (
        <Link href={'/'} onClick={() => signOut()}>SignOut</Link>
    )
}

export default SignOut