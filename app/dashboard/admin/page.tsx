'use client'

import { ChangeEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem
} from "@/components/ui/select"

const AdminPage = () => {
    const [newQuiz, setNewQuiz] = useState(false)
    const [formData, setFormData] = useState({
        question: '',
        choiceA: '',
        choiceB: '',
        choiceC: '',
        choiceD: '',
        correct: ''
    })

    const setDefaultForm = () => {
        setFormData({
            question: '',
            choiceA: '',
            choiceB: '',
            choiceC: '',
            choiceD: '',
            correct: ''
        })
    }

    const handleNewQuiz = () => {
        setNewQuiz((prev) => !prev)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        e.preventDefault()

        const { type, name, value } = e.target
        if (type === 'select') console.log('SELECT is selected')
        setFormData((prevVals) => ({
            ...prevVals,
            [name]: value
        }))
    }

    const handleFormSubmit = () => {
        const postQuestion = {
            text: formData.question,
            options: [
                { id: '', text: formData.choiceA },
                { id: '', text: formData.choiceB },
                { id: '', text: formData.choiceC },
                { id: '', text: formData.choiceD },
            ],
            correctOptionId: (Number(formData.correct) - 1).toString()
        }
        console.log(postQuestion)
        setDefaultForm()
    }


    return (
        <div>
            <div className="flex justify-between">
                <h2>Admin Page</h2>
                <Button variant={"outline"} onClick={handleNewQuiz} disabled={newQuiz}>Add Quiz</Button>
                {/* <p>State : {newQuiz.toString()}</p> */}
            </div>

            {newQuiz &&
                <form action={handleFormSubmit} className="shadow-none!">
                    <h2>Subject</h2>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Topic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Subjects</SelectLabel>
                                <SelectItem value="ENGLISH">ENGLISH</SelectItem>
                                <SelectItem value="TELUGU">TELUGU</SelectItem>
                                <SelectItem value="MATHEMATICS">MATHEMATICS</SelectItem>
                                <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                <SelectItem value="SOCIAL">SOCIAL</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <h2>Question</h2>
                    <Textarea id="question" name="question"
                        placeholder="Enter new question"
                        value={formData.question}
                        onChange={handleChange}
                    />
                    <h2>Choices</h2>
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="choiceA">1.</Label>
                        <Input id="choiceA" name="choiceA"
                            placeholder="Choice A"
                            value={formData.choiceA}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="choiceB">2.</Label>
                        <Input id="choiceB" name="choiceB"
                            placeholder="Choice B"
                            value={formData.choiceB}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="choiceC">3.</Label>
                        <Input id="choiceC" name="choiceC"
                            placeholder="Choice C"
                            value={formData.choiceC}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="choiceD">4.</Label>
                        <Input id="choiceD" name="choiceD"
                            placeholder="Choice D"
                            value={formData.choiceD}
                            onChange={handleChange}
                        />
                    </div>
                    <h2>Correct Option</h2>
                    <Input id="correct" name="correct"
                        placeholder="Correct Choice"
                        value={formData.correct}
                        onChange={handleChange}
                    />
                    <div className="flex gap-5 w-full justify-center">
                        <div className="flex-1 flex gap-5 justify-end">
                            <Button variant={'outline'} onClick={() => setNewQuiz(!newQuiz)}>Close</Button>
                            <Button variant={'destructive'} onClick={setDefaultForm}>Clear</Button>
                        </div>
                        <Button variant={'default'} type="submit">Add Question</Button>
                    </div>
                </form>
            }
        </div>
    )
}

export default AdminPage