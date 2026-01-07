'use client'

import React, { useState } from "react"
import * as z from 'zod'

import { createQuestion } from '@/actions/user-actions'
import { QuestionFormData, QuestionSchema, Subject, SubjectTitles } from "@/schemas"

const initialFormData = {
    title: Subject.ENGLISH,
    category: '',
    text: '',
    options: ['', '', '', ''],
    correctOption: -1
}

const CreateQuestionPage = () => {
    const [formData, setFormData] = useState<QuestionFormData>(initialFormData)
    const [errors, setErrors] = useState<z.ZodError['issues'] | null>(null)
    const [message, setMessage] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name.startsWith('options')) {
            const index = parseInt(name.split('-')[1])
            const newOptions = [...formData.options]
            newOptions[index] = value
            setFormData({
                ...formData,
                options: newOptions
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...formData.options]
        newOptions[index] = value
        setFormData({
            ...formData,
            options: newOptions
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')
        setErrors(null)

        try {
            const validatedData = QuestionSchema.parse(formData)
            if (!validatedData) {
                setMessage('data not validated')
            }
            const response = await createQuestion(validatedData)
            if (!response) {

            }
            setMessage('question saved with id : ' + response.id)
            setFormData(initialFormData)
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(error.issues)
            } else if (error instanceof Error) {
                setMessage(`Error : ${error.message}`)
            } else {
                setMessage('An unexpected error occurred')
            }
        }
    }

    const getErrorMessage = (path: string) => {
        return errors?.find(e => e.path.join('.') === path)?.message
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='shadow-none'>
                <div className='flex justify-between w-full gap-5'>
                    <select id='title' name='title'
                        value={formData.title}
                        onChange={handleChange}
                        className="rounded bg-gray-500/20 px-2"
                    >
                        {SubjectTitles.map((subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        )))}
                    </select>
                    <input id='category' name='category' type='text'
                        placeholder='enter category'
                        value={formData.category}
                        onChange={handleChange}
                        className='w-full rounded bg-gray-500/20'
                    />
                </div>
                {getErrorMessage('title') && <p className="form-err-text">{getErrorMessage('title')}</p>}
                {getErrorMessage('category') && <p className="form-err-text">{getErrorMessage('category')}</p>}
                <textarea id='text' name='text'
                    placeholder='enter question here'
                    rows={4}
                    value={formData.text}
                    onChange={handleChange}
                    className='w-full rounded bg-gray-500/20 p-2'
                />
                {getErrorMessage('text') && <p className="form-err-text">{getErrorMessage('text')}</p>}
                <div>
                    {formData.options.map((option, index) => (
                        <div key={index}>
                            <input name={`options-${index}`} type='text'
                                placeholder={`enter option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className='w-full rounded bg-gray-500/20 mb-2'
                            />
                            {getErrorMessage(`options.${index}`) && <p className="form-err-text">{getErrorMessage(`options.${index}`)}</p>}
                        </div>
                    ))}
                </div>
                <div>
                    <input id='correctOption' name='correctOption' type='number'
                        placeholder='enter correct option'
                        value={formData.correctOption}
                        onChange={handleChange}
                        className='w-full rounded bg-gray-500/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    />
                    {getErrorMessage('correctOption') && <p className="form-err-text">{getErrorMessage('correctOption')}</p>}
                </div>
                <button type='submit' className='cursor-pointer'>Submit Question</button>
                {message && <p className="form-success-text">{message}</p>}
            </form>
        </div>
    )
}

export default CreateQuestionPage