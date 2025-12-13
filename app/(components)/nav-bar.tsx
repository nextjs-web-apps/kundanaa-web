import ThemeSwitch from "./theme-switch"

const NavBar = () => {
    return (
        <nav className="flex w-full p-2 items-center bg-purple-500/10">
            <div className="flex-col">
                <h1>Kundanaa&apos;s Website</h1>
                <p className="font-mono text-red-500">under construction...</p>
            </div>
            <div className="flex-1"></div>
            <div className="flex gap-2 items-center">
                <ThemeSwitch />
            </div>
        </nav>
    )
}

export default NavBar