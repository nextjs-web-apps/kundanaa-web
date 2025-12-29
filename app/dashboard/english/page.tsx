'use server'

import { getJsonFile } from "@/actions/user-actions"
import AddResource from "@/components/add-res"
import Dropdown from "@/components/dropdown"
import QuizComponent from "@/components/quiz-comp"


const EnglishPage = async () => {
    const questions = await getJsonFile('english.json')

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