import { getUsers } from '@/actions/user-actions'
import React from 'react'

const UsersPage = async () => {
    const users = await getUsers()

    return (
        <div>
            <h2 className='underline'>Users Page</h2>
            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    )
}

export default UsersPage