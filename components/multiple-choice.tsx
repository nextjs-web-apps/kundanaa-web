'use client'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import React, { FormEvent, useEffect, useState } from 'react'

import { QuestionsProps } from '@/lib/constants'
import { Button } from './ui/button'
import { Input } from './ui/input'



const MultipleChoices: React.FC<QuestionsProps> = ({ questions }) => {
    const [allQuestions, setAllQuestions] = useState(questions ?? [])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})
    const [result, setResult] = useState<string | null>(null)
    const [attempted, setAttempted] = useState(1)

    const currentQuestion = allQuestions[currentIndex]

    const handleCheckboxChange = (questionId: string, optionId: string) => {
        setSelectedOptions((prevOpts) => {
            const currentSelection = prevOpts[questionId] || []
            if (currentSelection.includes(optionId)) {
                return {
                    ...prevOpts,
                    [questionId]: currentSelection.filter(id => id !== optionId)
                }
            } else {
                return {
                    ...prevOpts,
                    [questionId]: [...currentSelection, optionId]
                }
            }
        })
        calculateAttempts(questionId, optionId)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        let score = 0;

        allQuestions?.forEach((question) => {
            const userOptions = selectedOptions[question.id] || []
            const isCorrect = userOptions.length === question.correctOption.length &&
                userOptions.every(option => question.correctOption.includes(option))
            if (isCorrect) {
                score++
            }
            setResult(`You attempted ${attempted} and scored ${score} out of ${allQuestions.length} questions.`)
        })

    }

    const handleNext = () => {
        if (currentIndex < allQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1)
            // console.log(currentQuestion.id)
            if (!selectedOptions[allQuestions[currentIndex + 1].id]) {
                setSelectedOptions(prev => {
                    return {
                        ...prev,
                        [allQuestions[currentIndex + 1].id]: []
                    }
                })
            }
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            // console.log(currentQuestion.id)
            if (!selectedOptions[allQuestions[currentIndex - 1].id]) {
                setSelectedOptions(prev => {
                    return {
                        ...prev,
                        [allQuestions[currentIndex - 1].id]: []
                    }
                })
            }
        }
    }

    const calculateAttempts = (questionId: string, optionId: string) => {
        Object.entries(selectedOptions).forEach(([k, v]) => {
            if (k === questionId) {
                // console.log('ENTRIES :', k, v.length)
                if (v.includes(optionId)) {
                    setAttempted(prev => prev > 0 ? prev - 1 : prev)
                    return
                } else {
                    setAttempted(prev => prev + 1)
                    return
                }
            }
        })
    }

    useEffect(() => {
        setAllQuestions(questions)
    }, [questions])

    return (
        <div>
            <h2>Multiple Choice Questions</h2>
            <div className='border p-5 rounded-2xl'>
                <h4>{currentQuestion?.id}. {currentQuestion?.questionText}</h4>
                {currentQuestion?.options.map((opt) => (
                    <div key={opt?.id} className='flex justify-between items-center'>
                        <label htmlFor={`opt-${currentQuestion?.id}`}>{opt?.id.toUpperCase()}. {opt?.text}</label>
                        <Input type='checkbox'
                            id={`opt-${currentQuestion?.id}`}
                            className='w-5 mr-0'
                            value={opt?.text}
                            checked={selectedOptions[currentQuestion?.id]?.includes(opt?.id)}
                            onChange={() => handleCheckboxChange(currentQuestion?.id, opt?.id)}
                        />
                    </div>
                ))}
                <div className='flex justify-between mt-5'>
                    <Button onClick={handlePrevious} disabled={currentIndex < 1}><FaArrowLeft /></Button>
                    <Button onClick={handleNext} disabled={currentIndex === allQuestions.length - 1}><FaArrowRight /></Button>
                </div>
            </div>
            {(attempted === allQuestions.length || allQuestions.length - 1 == currentIndex) && (
                <div className='flex justify-center mt-5'>
                    <Button type='submit' onClick={handleSubmit}>Submit Answer</Button>
                </div>
            )}
            {result && (
                <div className='flex gap-2 items-baseline'>
                    <h4>Results :</h4>
                    <p>{result}</p>
                </div>
            )}
        </div>
    )
}

export default MultipleChoices


/*
<form onSubmit={handleSubmit}>
    {allQuestions?.map((question) => (
        <div key={question?.id}>
            <h4>{question?.id}. {question?.questionText}</h4>
            {question?.options.map((opt) => (
                <div key={opt.id} className='flex'>
                    <label htmlFor={`opt-${question?.id}`} className='ms-2'>{opt.text}</label>
                    <Input type='checkbox'
                        id={`opt-${question?.id}`}
                        value={opt.text}
                        checked={selectedOptions[question.id]?.includes(opt.id)}
                        onChange={() => handleCheckboxChange(question?.id, opt.id)}
                    />
                </div>
            ))}
            <Button type='submit'>Submit Answer</Button>
        </div>
    ))}
</form> 
*/