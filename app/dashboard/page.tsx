import { auth } from "@/auth"

const DashboardPage = async () => {
    const session = await auth()

    return (
        <section>
            {session && (
                <>
                    <h2>Welcome {session.user?.name?.split(" ")[0]}!</h2>
                    <p className="text-[12px] font-mono">{session.user?.id}</p>
                    <p className="text-[12px] font-mono">{session.user?.email}</p>
                </>
            )}
            <h3 className="underline">This page includes :</h3>
            <h4>Academic Information & Resources</h4>
            <ol>
                <li>Course Materials</li>
                <li>Assignments</li>
                <li>Grades and Records</li>
                <li>Attendance Tracking</li>
                <li>Schedules and Calendars</li>
            </ol>
            <h4>Administrative Functions</h4>
            <ol>
                <li>Course Registration</li>
                <li>Admissions and Enrollments</li>
                <li>Exam Forms and Results</li>
                <li>Personal Profile Management</li>
            </ol>
            <h4>Communication and Support Tools</h4>
            <ol>
                <li>Announcements and Notifications</li>
                <li>Communicatoin Tools</li>
                <li>Library Resources</li>
                <li>Support Services</li>
            </ol>
        </section>
    )
}

export default DashboardPage