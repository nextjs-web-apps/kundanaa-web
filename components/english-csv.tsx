'use client'
import React, { useEffect, useState } from 'react'
import Papa, { ParseResult } from 'papaparse'
import { Button } from './ui/button'

interface CSVRow {
    sno: string
    question: string
    a: string
    b: string
    c: string
    d: string
    correct: string
}

const ReadEnglishCsv: React.FC = () => {
    const [csvData, setCsvData] = useState<CSVRow[]>([])
    const [showAnswer, setShowAnswer] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    // const [currentQuestion, setCurrentQuestion] = useState<CSVRow>()

    const getCSV = () => {
        Papa.parse('/English.csv', {
            header: true,
            download: true,
            skipEmptyLines: true,
            delimiter: ',',
            complete: (results: ParseResult<CSVRow>) => {
                setCsvData(results.data)
            }
        })
    }

    const currentQuestion = csvData[currentIndex]

    const handleNext = () => {
        if (currentIndex < csvData.length - 1) {
            setShowAnswer(false)
            setCurrentIndex(currentIndex + 1)
            // setCurrentQuestion(csvData[currentIndex])
        }
    }
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setShowAnswer(false)
            setCurrentIndex(currentIndex - 1)
            // setCurrentQuestion(csvData[currentIndex])
        }
    }

    useEffect(() => { getCSV() }, [])

    const handleButtonClick = (qno: string) => {
        console.log('qno : ', qno)
        setShowAnswer(!showAnswer)
    }

    return (
        <div>
            <h4 className='text-center mt-10'>Grammer: {csvData.length} questions</h4>
            {/* display current question */}
            <div className='flex flex-col gap-5 justify-center mt-10'>
                <p className='text-[16px] font-bold'>{currentQuestion?.sno}. {currentQuestion?.question}</p>
                <p className={showAnswer && currentQuestion?.correct === 'a' ? 'text-green-500' : ''}>A. {currentQuestion?.a}</p>
                <p className={showAnswer && currentQuestion?.correct === 'b' ? 'text-green-500' : ''}>B. {currentQuestion?.b}</p>
                <p className={showAnswer && currentQuestion?.correct === 'c' ? 'text-green-500' : ''}>C. {currentQuestion?.c}</p>
                <p className={showAnswer && currentQuestion?.correct === 'd' ? 'text-green-500' : ''}>D. {currentQuestion?.d}</p>
                <Button variant={'outline'} onClick={() => handleButtonClick(currentQuestion?.correct)}>
                    {!showAnswer ? 'Show Answer' : 'Hide Answer'}
                </Button>
                <div className='flex justify-between'>
                    <Button onClick={handlePrevious} disabled={currentIndex < 1}>Previous</Button>
                    <Button onClick={handleNext} disabled={currentIndex === csvData.length - 1}>Next</Button>
                </div>
            </div>
        </div >
    )
}

export default ReadEnglishCsv
