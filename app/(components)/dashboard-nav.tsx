import SignOut from "@/app/(components)/sign-out"
import { auth } from "@/auth"

const DashboardNavBar = async () => {
    const session = await auth();

    return (
        <section className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-bold">
                {session ?
                    session.user?.name?.split(" ")[0]
                    : 'Dashboard'}
            </h1>
            <div className="flex-1"></div>
            <SignOut />
        </section>
    )
}

export default DashboardNavBar