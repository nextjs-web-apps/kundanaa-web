import { auth } from '@/auth'
import { Input } from '@/components/ui/input'
import { PicNone } from '@/lib/constants'
import Image from 'next/image'

const ProfilePage = async () => {
    const session = await auth()
    const user = session?.user

    return (
        <div className='border p-2'>
            <h2 className='underline text-center'>Profile Page</h2>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <h4>Profile picture :</h4>
                <Image

                    src={user?.image || PicNone}
                    alt={user?.name || 'picNone'}
                    width={100} height={100}
                />
                <Input type='file' id='imageInput' />
            </div>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <h4>Name :</h4>
                <p>{user?.name || 'NA'}</p>
                <Input type='text' name='image' id='image' placeholder='change your name' />
            </div>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <h4>Email :</h4>
                <p>{user?.email || 'NA'}</p>
                <Input type='text' disabled placeholder={user?.email || ''} />
            </div>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <h4>About Me :</h4>
                <textarea name='introduction' id='introduction' rows={5} className='col-span-2 w-full border' />
            </div>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <h4>Hobbies :</h4>
                <textarea name='hobbies' id='hobbies' rows={5} className='col-span-2 w-full border' />
            </div>
        </div>
    )
}

export default ProfilePage