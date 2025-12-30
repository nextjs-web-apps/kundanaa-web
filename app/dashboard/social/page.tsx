import Dropdown from "@/components/dropdown"
import QuizComponent from "@/components/quiz-comp"
import { getGoogleSheetsData } from "@/lib/googleSheets"

const SocialPage = async () => {
    const range = 'Social!A:I'
    const questions = await getGoogleSheetsData(range)

    if (!questions) {
        return <div>There is no data.</div>
    }

    return (
        <div>
            <h2 className="underline">Social Page</h2>
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

export default SocialPage