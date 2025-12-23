import ThemeSwitch from "./theme-switch"

const NavBarSection = () => {
    return (
        <nav className="flex w-full p-2 items-center border-b-2">
            <div className="wrap">
                <h1 className="drop-shadow-themebg drop-shadow">Kundanaa&apos;s Website</h1>
                <p className="text-[12px] font-mono text-red-500">under construction...</p>
            </div>
            <div className="flex-1"></div>
            <ThemeSwitch />
        </nav>
    )
}

export default NavBarSection