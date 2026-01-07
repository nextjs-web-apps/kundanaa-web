'use client'

import { QuizProps } from '@/lib/constants';
import { CountByField } from '@/lib/utils'

const GetQuestionPage = ({ questions }: QuizProps) => {
    const counts = CountByField(questions, 'title')

    return (
        <div>
            <table className="mytable">
                <thead><tr><td>Subject</td><td>Questions</td></tr></thead>
                <tbody>
                    <tr><td>English</td><td>{counts['English'] || 0}</td></tr>
                    <tr><td>Telugu</td><td>{counts['Telugu'] || 0}</td></tr>
                    <tr><td>Mathematics</td><td>{counts['Mathematics'] || 0}</td></tr>
                    <tr><td>Science</td><td>{counts['Science'] || 0}</td></tr>
                    <tr><td>Social</td><td>{counts['Social'] || 0}</td></tr>
                    <tr><td>Computer</td><td>{counts['Computer'] || 0}</td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default GetQuestionPage