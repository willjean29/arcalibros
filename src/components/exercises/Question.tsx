import React from 'react'

interface QuestionProps {
    text: string;
}

const Question: React.FC<QuestionProps> = (props) => {
    return (
        <div className="question-card">
            {props.text}
        </div>
    )
}

export default Question
