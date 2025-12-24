'use client'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { AddResourceSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const AddResource = () => {
    const [message, setMessage] = useState('')

    const form = useForm<z.infer<typeof AddResourceSchema>>({
        resolver: zodResolver(AddResourceSchema),
        defaultValues: {
            title: '',
            resource: ''
        }
    })

    const onSubmit = (data: z.infer<typeof AddResourceSchema>) => {
        const validatedData = AddResourceSchema.parse(data)
        const { title } = validatedData
        setMessage('successfully added resource under title:' + title)
        // alert('submitting... title:' + title + ' resource:' + resource)
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="shadow-none! flex flex-row! border-none! justify-between">
                    <FormField name='title'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="max-w-[150px]">
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Add Title" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField name='resource'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Add new resource..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="text-2xl">+</Button>
                </form>
            </Form>
            {message && (<p>{message}</p>)}
        </section>
    )
}

export default AddResource