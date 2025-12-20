'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col max-w-[500px] justify-center items-center mx-auto mt-40 gap-5 border p-5 rounded-2xl bg-red-500/30">
            <p className="text-3xl drop-shadow-themebg drop-shadow tracking-widest">Something went wrong... !</p>
            <Button variant={'destructive'} className="cursor-pointer w-full py-8 text-2xl" onClick={() => reset()}>Try again</Button>
        </div>
    )
}

export default ErrorPage