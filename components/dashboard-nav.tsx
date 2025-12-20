import Link from "next/link";

import { auth } from "@/auth"
import SignOut from "@/components/sign-out"
import { MdDashboard } from 'react-icons/md'
import Image from "next/image";
import { PicNone } from "@/lib/constants";


const DashboardNavBar = async () => {
    const session = await auth();

    return (
        <section className="w-full flex items-center justify-between gap-2 border-b border-themebg/30">
            <h3>Hi {session ?
                session.user?.name?.split(" ")[0]
                : 'Dashboard'}!</h3>
            <div className="flex-1"></div>
            <Link href={'/dashboard'} className="text-sm py-2 hover:bg-transparent dark:hover:bg-transparent">
                <MdDashboard size={28} className="text-orange-500" />
            </Link>
            <Link href={'/dashboard/profile'} className="hover:bg-transparent dark:hover:bg-transparent">
                <Image
                    className="rounded-full drop-shadow drop-shadow-themebg"
                    src={session?.user.image || PicNone}
                    alt={session?.user.name || 'picNone'}
                    width={28} height={28}
                />
            </Link>
            <SignOut />
        </section>
    )
}

export default DashboardNavBar