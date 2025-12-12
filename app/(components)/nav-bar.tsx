import ThemeSwitch from "./theme-switch"

const NavBar = () => {
    return (
        <nav className="flex w-full p-2">
            <div className="flex-col">
                <h1>Kundanaa&apos;s Website</h1>
                <p className="font-mono text-orange-500">under construction...</p>
            </div>
            <div className="flex-1"></div>
            <div className="flex gap-2 items-center">
                <ThemeSwitch />
            </div>
        </nav>
    )
}

export default NavBar