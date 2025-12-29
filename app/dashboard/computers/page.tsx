import { getJsonFile } from "@/actions/user-actions"
import Dropdown from "@/components/dropdown"
import QuizComponent from "@/components/quiz-comp"

const ComputersPage = async () => {
    const questions = await getJsonFile('computer.json')
    
    return (
        <div>
            <h2 className="underline">Computers Page</h2>
            <div className="flex flex-col gap-2">
                <Dropdown buttonContent={'Materials'}>
                    <div>
                        <h4>Materials</h4>
                        <p>This includes materail for studying purpose.</p>
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
                        <h4>Assignments</h4>
                        <p>This includes assignmets to improve your grade.</p>
                    </div>
                </Dropdown>
            </div >
            <QuizComponent questions={questions} />
        </div>
    )
}

export default ComputersPage