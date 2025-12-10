import SignOut from "@/app/(components)/sign-out"

const DashboardNavBar = () => {
    return (
        <section className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <SignOut />
        </section>
    )
}

export default DashboardNavBar