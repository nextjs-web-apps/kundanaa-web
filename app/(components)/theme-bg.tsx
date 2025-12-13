'use client'

import { useTheme } from "next-themes"
import DarkVeil from "./ui/DarkVeil"

const ThemeBackground = () => {
    const { theme } = useTheme()
    if (theme === 'dark') return (
        <DarkVeil />
    )
}

export default ThemeBackground