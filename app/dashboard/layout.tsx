import DashboardNavBar from "@/app/(components)/dashboard-nav"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            <DashboardNavBar />
            {children}
        </section>
    )
}

export default DashboardLayout