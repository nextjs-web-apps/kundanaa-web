'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"
import { FaSignOutAlt } from "react-icons/fa"

const SignOut = () => {
    return (
        <Link href={'/'} onClick={() => signOut()} className="text-red-500">
            <FaSignOutAlt size={24} />
        </Link>
    )
}

export default SignOut