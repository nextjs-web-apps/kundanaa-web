'use client'

import { useTheme } from "next-themes"

const ThemeBackground = () => {
    const { theme } = useTheme()
    if (theme === 'dark') return (
        // <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#140030_40%,#000_100%)]"></div>
        // </div>
    )
    else return (
        // <div className="absolute inset-0 top-0 z-[-1] min-h-screen" >
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        // </div>
    )
}

export default ThemeBackground