import { getUsers } from '@/actions/user-actions'

const ProfilePage = async () => {
    const users = await getUsers()

    return (
        <div>
            <h2 className='underline'>Profile Page</h2>
            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    )
}

export default ProfilePage