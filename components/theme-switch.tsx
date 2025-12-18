'use client'

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => {
        const setmount = () => {
            setMounted(true)
        }
        setmount()
    }, [])

    if (!mounted) return (
        <Image
            src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=='
            width={36}
            height={36}
            sizes="36x36"
            alt="Loading Light/Dark Toggle"
            priority={false}
            title="Loading Light/Dark Toggle"
        />
    )
    if (resolvedTheme === 'dark') {
        return (
            <div className="flex items-center space-x-1 px-2 cursor-pointer hover:bg-themebg" onClick={() => setTheme('light')} >
                <p>Light</p>
                <FiSun />
            </div>
        )
    }
    if (resolvedTheme === 'light') {
        return (
            <div className="flex items-center space-x-1 px-2 cursor-pointer hover:bg-themebg" onClick={() => setTheme('dark')} >
                <p>Dark</p>
                <FiMoon />
            </div>
        )
    }
}


export default ThemeSwitch