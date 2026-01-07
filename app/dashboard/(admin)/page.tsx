'use server'

import { getQuestions } from "@/actions/user-actions"
import CreateQuestionPage from "./create"
import GetQuestionPage from "./get"
import Tabs from "./tabs"

const AdminPage = async () => {
    const questions = await getQuestions()

    const tabsConfig = [
        { id: 'get', label: 'Dashboard', content: <GetQuestionPage questions={questions} /> },
        { id: 'create', label: 'Create', content: <CreateQuestionPage /> },
    ]

    return (
        <section>
            <h1 className="text-center mb-5">Manipulate Questions</h1>
            <Tabs tabs={tabsConfig} />
        </section>
    )
}

export default AdminPage