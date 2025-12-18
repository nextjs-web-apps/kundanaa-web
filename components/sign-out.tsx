'use client'

import { signOut } from "next-auth/react"
import { FaSignOutAlt } from "react-icons/fa"

const SignOut = () => {
    const logout = () => {
        signOut()
    }
    return (
        <FaSignOutAlt
            size={24}
            color="#fe2e2e"
            onClick={logout}
            className="cursor-pointer"
        />
    )
}

export default SignOut