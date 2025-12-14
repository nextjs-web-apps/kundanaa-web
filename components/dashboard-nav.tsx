import Link from "next/link";

import { auth } from "@/auth"
import SignOut from "@/components/sign-out"
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import Image from "next/image";
const DashboardNavBar = async () => {
    const session = await auth();
    const picNone = "https://lh3.googleusercontent.com/a-/AOh14GhRv3JUcLKBQD3GSVZZbHHoQBxvPXafNlPICiU_=s96-c"

    return (
        <section className="w-full flex items-center justify-between gap-2 border-b border-themebg/30">
            <Image src={session?.user.image || picNone} alt={session?.user.name || 'picNone'} width={36} height={36} />
            <h1>Hi {session ?
                session.user?.name?.split(" ")[0]
                : 'Dashboard'}!</h1>
            <div className="flex-1"></div>
            <Link href={'/dashboard'}
                className="text-2xl font-bold hover:bg-transparent">
                <FaHome color="blue" />
            </Link>
            <Link href={'/dashboard/users'}
                className="text-2xl font-bold hover:bg-transparent">
                <FaUsers color="purple" />
            </Link>
            <Link href={'/dashboard/users'}
                className="text-[20px] font-bold hover:bg-transparent">
                <FaUser color="green" />
            </Link>
            <SignOut />
        </section>
    )
}

export default DashboardNavBar