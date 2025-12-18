'use client'

const FooterSection = () => {
    return (
        <footer>
            <div className="flex items-center justify-center py-4 font-mono tracking-wider">
                <p className="text-[12px]">&copy;{new Date().getFullYear()} &#x2605; &#64;Praveen &#x2605; All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default FooterSection