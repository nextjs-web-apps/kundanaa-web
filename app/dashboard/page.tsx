import { auth } from "@/auth"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
    const session = await auth()
    if (!session) {
        redirect('/')
    }

    return (
        <section>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {session && <p>Welcome {session.user?.name?.split(" ")[0]}!</p>}
        </section>
    )
}

export default DashboardPage