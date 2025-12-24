'use client'

import React, { ReactNode, useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

interface DropdownProps {
    buttonContent: ReactNode
    children: ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ buttonContent, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev)
    }
    const handleDropdownClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If the click is outside the referenced element, close the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <div ref={dropdownRef}>
            <Button variant={"outline"} onClick={toggleDropdown}
                className="w-full flex justify-between text-[18px] font-bold uppercase"
            >
                {buttonContent}
                {!isOpen
                    ? <FaArrowDown />
                    : <FaArrowUp />
                }
            </Button>
            {isOpen && (
                <div onClick={handleDropdownClick}>
                    {children}
                </div>
            )}
        </div>
    )
}

export default Dropdown