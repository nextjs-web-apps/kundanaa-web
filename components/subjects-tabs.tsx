'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { ImMenu } from 'react-icons/im'

interface LinkItem {
  name: string
  href: string
}

interface LinkRowProps {
  links: LinkItem[]
}

const SubjectsTabs: React.FC<LinkRowProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section>
      {/* desktop menu */}
      <div className='hidden md:flex justify-end items-center'>
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <Link key={link.href} href={link.href} passHref
              className={`sub-link ${isActive ? 'sub-active' : ''}`}>
              {link.name}
            </Link>
          )
        })}
      </div>
      {/* mobile show ham */}
      <div className='md:hidden flex justify-end cursor-pointer'>
        <h4 className='flex-1 text-orange-500 uppercase font-mono'>Subjects</h4>
        <ImMenu onClick={toggleMenu} color='orange' size={22} />
      </div>
      {/* mobile menu */}
      {isOpen && (
        <div className='md:hidden flex flex-col'>
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href} passHref
                className={`sub-link ${isActive ? 'sub-active' : ''}`}
                onClick={toggleMenu}>
                {link.name}
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default SubjectsTabs