'use server'

import User from "@/app/(models)/User"
import { connectDB } from "@/lib/connectDB"

const registerCredentials = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
        await connectDB()

        const foundUser = await User.findOne({ email: email })
        if (foundUser) {
            return { error: 'user already exists' }
        }

        // const hashedPassword = bcrypt.hash(password, 10)
        // await User.create({ name: name, emai: email, password: hashedPassword })
        const newUser = new User({ name, email, password })
        await newUser.save()

        return { success: 'user created successfully, please login' }
    } catch (error) {
        console.log('Error registering', error)
        return { error: `error registering: ${error}` }
    }
}

export default registerCredentials