import { getUsers } from "@/actions/user-actions"
import ThemeSwitch from "@/components/theme-switch"

interface PageProps {
  params: Promise<{
    tab: string
  }>
}

const FriendSection = async () => {
  const users = await getUsers()

  return (
    <div>
      <div className="text-center border p-2">
        <h2 className="underline">Currently Registered</h2>
        {users.map((user, index) => (
          <div key={user.id} className="border flex flex-col md:flex-row justify-between items-center p-2">
            <p className="tracking-wider">{String(index + 1).padStart(2, '0')}.&nbsp;&nbsp;</p>
            <p className="flex-1 font-bold text-start">{user.name}</p>
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
      <div className="text-center border p-2">
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