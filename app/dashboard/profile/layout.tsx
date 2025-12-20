import Link from 'next/link'
import React from 'react'

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            <nav className='flex gap-2 text-sm justify-end'>
                <Link href={'/dashboard/profile'}>Overview</Link>
                <Link href={'/dashboard/profile/friends'}>Friends</Link>
                <Link href={'/dashboard/profile/settings'}>Settings</Link>
            </nav>
            {children}
        </section>
    )
}

export default ProfileLayout