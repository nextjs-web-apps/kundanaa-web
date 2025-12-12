const Grades = () => {
    return (
        <section>
            <div>
                <h4>Materials</h4>
                <p>This includes materail for studying purpose.</p>
            </div>
            <div>
                <h4>Grades</h4>
                <p>This includes grades acheived.</p>
            </div>
            <div>
                <h4>Assignments</h4>
                <p>This includes assignmets to improve your grade.</p>
            </div>
        </section>
    )
}

const EnglishPage = () => {
    return (
        <div>
            <h2 className="underline">English Page</h2>
            <Grades />
        </div>
    )
}

export default EnglishPage