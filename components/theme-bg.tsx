'use client'

import { useTheme } from "next-themes"

import DarkVeil from "@/components/ui/DarkVeil"

const ThemeBackground = () => {
    const { theme } = useTheme()
    if (theme === 'dark') return (
        <DarkVeil />
    )
    else return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    )
}

export default ThemeBackground