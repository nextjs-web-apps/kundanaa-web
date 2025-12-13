'use client'

import { signOut } from "next-auth/react"
import { FaSignOutAlt } from "react-icons/fa"

const SignOut = () => {
    const logout = () => {
        signOut()
    }
    return (
        <FaSignOutAlt size={24} color="red" onClick={logout} className="hover:cursor-pointer" />
    )
}

export default SignOut