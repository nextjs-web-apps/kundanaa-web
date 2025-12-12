import { auth } from "@/auth"

const DashboardPage = async () => {
    const session = await auth()

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