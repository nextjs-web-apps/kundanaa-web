'use server'

import AddResource from "@/components/add-res"
import Dropdown from "@/components/dropdown"
import QuizComponent from "@/components/quiz-comp"
import { getGoogleSheetsData } from "@/lib/googleSheets"


const EnglishPage = async () => {
    const range = 'English!A:I'
    const questions = await getGoogleSheetsData(range)

    if (!questions) {
        return <div>There is no data.</div>
    }

    return (
        <div>
            <h2 className="underline">English Page</h2>
            <div className="flex flex-col gap-2">
                <Dropdown buttonContent={'Materials'}>
                    <div>
                        <h4>Add New Material:</h4>
                        <AddResource />
                        <p>This includes materail resources for study purpose.</p>
                    </div>
                </Dropdown>
                <Dropdown buttonContent={'Grades'}>
                    <div>
                        <h4>Grades</h4>
                        <p>This includes grades acheived.</p>
                    </div>
                </Dropdown>
                <Dropdown buttonContent={'Assignments'}>
                    <div>
                        <p>This includes assignmets to improve your grade.</p>
                    </div>
                </Dropdown>
            </div >
            <QuizComponent questions={questions} />
        </div >
    )
}

export default EnglishPage