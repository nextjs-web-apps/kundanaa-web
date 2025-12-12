import { auth } from "@/auth"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
    const session = await auth()
    if (!session) {
        redirect('/')
    }

    return (
        <section>
            {session && (
                <>
                    <h2 className="text-[16px] font-bold">Welcome {session.user?.name?.split(" ")[0]}!</h2>
                    <p className="text-[12px] font-mono">{session.user?.id}</p>
                    <p className="text-[12px] font-mono">{session.user?.email}</p>
                </>
            )}
        </section>
    )
}

export default DashboardPage