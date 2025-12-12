'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface LinkItem {
  name: string
  href: string
}

interface LinkRowProps {
  links: LinkItem[]
}

const SubjectsTabs: React.FC<LinkRowProps> = ({ links }) => {
  const pathname = usePathname()
  return (
    <section id='subjects' className='flex flex-col md:flex-row gap-2 mt-2'>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href)
        return (
          <Link key={link.href} href={link.href} passHref
            className={`sub-link ${isActive ? 'sub-active' : ''}`}>
            {link.name}
          </Link>
        )
      })}
    </section>
  )
}

export default SubjectsTabs