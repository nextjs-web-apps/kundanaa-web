import { auth } from '@/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PicNone } from '@/lib/constants'
import Image from 'next/image'

const ProfilePage = async () => {
    const session = await auth()
    const user = session?.user

    return (
        <div className='border p-2 rounded-2xl shadow-themebg shadow-2xl'>
            <h2 className='underline text-center'>Profile Page</h2>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <Label htmlFor='imageInput'>Profile picture :</Label>
                <Image
                    src={user?.image || PicNone}
                    alt={user?.name || 'picNone'}
                    width={100} height={100}
                />
                <Input type='file' id='imageInput' name='imageInput' />
            </div>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <Label htmlFor='name'>Name :</Label>
                <p>{user?.name || 'NA'}</p>
                <Input type='text' name='name' id='name' placeholder='change your name' />
            </div>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <Label htmlFor='email'>Email :</Label>
                <p>{user?.email || 'NA'}</p>
                <Input type='text' id='email' name='email' disabled placeholder={user?.email || ''} />
            </div>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <Label htmlFor='introduction'>About Me :</Label>
                <Textarea name='introduction' id='introduction'
                    placeholder='Write about yourself...'
                    className='col-span-2'
                />
            </div>
            <div className='grid grid-cols-1 p-2 md:grid-cols-3 border gap-2 place-items-start items-center w-full'>
                <Label htmlFor='hobbies'>Hobbies :</Label>
                <Textarea name='hobbies' id='hobbies'
                    placeholder='Write about your hobbies...'
                    className='col-span-2'
                />
            </div>
        </div>
    )
}

export default ProfilePage