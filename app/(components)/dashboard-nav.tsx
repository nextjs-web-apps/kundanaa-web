import SignOut from "@/app/(components)/sign-out"
import { auth } from "@/auth"
import Link from "next/link";

const DashboardNavBar = async () => {
    const session = await auth();

    return (
        <section className="w-full flex items-center justify-between gap-2">
            <Link href={'/dashboard'}
                className="text-2xl font-bold">
                {session ?
                    'Welcome ' + session.user?.name?.split(" ")[0]
                    : 'Dashboard'}
            </Link>
            <div className="flex-1"></div>
            <SignOut />
        </section>
    )
}

export default DashboardNavBar