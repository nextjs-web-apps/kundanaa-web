import SignOut from "@/app/(components)/sign-out"
import { auth } from "@/auth"

const DashboardNavBar = async () => {
    const session = await auth();

    return (
        <section className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
                {session ?
                    session.user?.name?.split(" ")[0]
                    : 'Dashboard'}
            </h1>
            <SignOut />
        </section>
    )
}

export default DashboardNavBar