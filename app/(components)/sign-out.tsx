'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"
import { FaSignOutAlt } from "react-icons/fa"

const SignOut = () => {
    return (
        <Link href={'/'} onClick={() => signOut()} className="text-red-500/30 hover:text-red-800">
            <FaSignOutAlt />
        </Link>
    )
}

export default SignOut