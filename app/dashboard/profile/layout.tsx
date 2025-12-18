import ThemeSwitch from '@/components/theme-switch'
import React from 'react'

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            <nav className='flex justify-end'>
                <p className='px-2 hover:bg-themebg cursor-pointer'>Friends</p>
                <ThemeSwitch />
            </nav>
            {children}
        </section>
    )
}

export default ProfileLayout