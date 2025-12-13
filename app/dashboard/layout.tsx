import DashboardNavBar from "@/app/(components)/dashboard-nav"
import SubjectsTabs from "@/app/(components)/subjects-tabs";
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()
    if (!session) {
        redirect('/')
    }

    const subjectLinks = [
        { name: 'English', href: '/dashboard/english' },
        { name: 'Telugu', href: '/dashboard/telugu' },
        { name: 'Mathematics', href: '/dashboard/mathematics' },
        { name: 'Science', href: '/dashboard/science' },
        { name: 'Social', href: '/dashboard/social' },
        { name: 'Computers', href: '/dashboard/computers' },
    ]

    return (
        <section>
            <DashboardNavBar />
            <SubjectsTabs links={subjectLinks} />
            <section className="mt-5">
                {children}
            </section>
        </section>
    )
}

export default DashboardLayout