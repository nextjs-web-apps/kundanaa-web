'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { RiResetLeftFill } from "react-icons/ri"

const Increment = () => {
    const [attempt, setAttempt] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})

    const handleAdd = () => {
        setAttempt(prev => prev + 1)
    }
    const handleReset = () => {
        setAttempt(0)
    }
    const handleCheckboxChange = (q: string, oid: string) => {
        setSelectedOptions((prevOpts) => {
            const currentSelection = prevOpts[q] || []
            if (currentSelection.includes(oid)) {
                return {
                    ...prevOpts,
                    [q]: currentSelection.filter(id => id !== oid)
                }
            } else {
                return {
                    ...prevOpts,
                    [q]: [...currentSelection, oid]
                }
            }
        })
        calculateAttempts(q, oid)
    }
    const calculateAttempts = (q: string, oid: string) => {
        console.log('SELECT OPTIONS :', selectedOptions)
        Object.entries(selectedOptions).forEach(([k, v]) => {
            if (q === k) {
                if (v.includes(oid)) {
                    setAttempt(prev => prev - 1)
                } else {
                    setAttempt(prev => prev + 1)
                }
                // console.log('OPTIONS AFTER:', selectedOptions[q])
                console.log('OPTIONS LEN :', k, v[0])
            }
        })
    }
    const items = [
        {
            id: '1', options: [
                { id: '1', value: 'one' },
                { id: '2', value: 'two' },
                { id: '3', value: 'three' },
                { id: '4', value: 'four' },
            ]
        },
        {
            id: '2', options: [
                { id: '1', value: 'one' },
                { id: '2', value: 'two' },
                { id: '3', value: 'three' },
                { id: '4', value: 'four' },
            ]
        },
    ]
    return (
        <section className="mt-10" >
            <div className="mt-10 flex gap-5 items-center" >
                <Button onClick={handleReset}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-150 ease-in-out active:bg-blue-700 active:shadow-md" ><RiResetLeftFill /> </Button>
                <Button onClick={handleAdd} className="" ><FaPlus /> </Button>
                <p className="text-3xl">{attempt}</p>
            </div>
            <div className="mt-5 flex flex-col gap-2">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-2">
                        {item.options.map((opt) => (
                            <div key={opt.id}>
                                <Input type="checkbox"
                                    id={`opt-${opt.id}`}
                                    className="w-8"
                                    checked={selectedOptions[item.id]?.includes(opt.id)}
                                    onChange={() => handleCheckboxChange(item.id, opt.id)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {items.map((item) => (
                <p key={item.id}>OPTIONS : {selectedOptions[item.id]}</p>
            ))}
        </section>
    )
}

export default Increment