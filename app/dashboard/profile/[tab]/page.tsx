import { getUsers } from "@/actions/user-actions"
import ThemeSwitch from "@/components/theme-switch"
import { Student } from "@/lib/constants"
import Image from "next/image"

interface PageProps {
  params: Promise<{
    tab: string
  }>
}

const FriendSection = async () => {
  const users = await getUsers()

  return (
    <div>
      <div className="text-center border p-2 rounded-2xl shadow-themebg shadow-2xl">
        <h2 className="underline">Currently Registered</h2>
        {users.map((user) => (
          <div key={user.id} className="border flex flex-col md:flex-row justify-between items-center p-2">
            {/* <p className="tracking-wider">{String(index + 1).padStart(2, '0')}.&nbsp;&nbsp;</p> */}
            <Image src={user.image || Student} alt={user.name} width={32} height={32} className="rounded-full" />
            <p className="flex-1 font-bold text-start ms-2">{user.name}</p>
            <p>Friend-Unfriend / Request / Chat</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const SettingSection = () => {
  return (
    <div>
      <div className="text-center border p-2 rounded-2xl shadow-themebg shadow-2xl">
        <h2 className="underline">Settings Page</h2>
        <div className="border flex flex-col md:flex-row justify-between items-center p-2">
          Theme
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

const TabSection = async ({ params }: PageProps) => {
  const { tab } = await params
  switch (tab) {
    case "friends":
      return <FriendSection />
    case "settings":
      return <SettingSection />
  }
}

export default TabSection