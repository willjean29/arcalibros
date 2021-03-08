import React from "react";

import imgUser from "../../assets/images/user.png";
import imgApproved from "../../assets/icons/approved.png";
import { AnswerExam } from "../../store/exam/interfaces/answer-exam.interface";
import { Student } from "../../store/user/interfaces/student.interface";

interface IProps {
  answerExam: AnswerExam;
}

const ParticipantEvaluationDetail: React.FC<IProps> = ({ answerExam }) => {
  const accuracy: number =
    (answerExam.correct * 100) / answerExam.answers.length;
  const grades: number = (answerExam.correct * 20) / answerExam.answers.length;
  return (
    <div className="participant-evaluation-detail">
      <div className="user-profile">
        <img src={imgUser} alt="" />
      </div>
      <div className="participant">
        <h2>
          {(answerExam.student as Student).firstName.concat(
            " " + (answerExam.student as Student).lastName
          )}
        </h2>
      </div>
      <div className="answers">
        <div className="correct-answers">
          <img src="" alt="" />
          <span>{answerExam.correct}</span>
        </div>
        <div className="incorrect-answers">
          <img src="" alt="" />
          <span>{answerExam.incorrect}</span>
        </div>
      </div>
      <span className="accuracy">{Math.round(accuracy)}%</span>
      <div className="grades">{Math.round(grades)}</div>
      {Math.round(grades) >= 0 && Math.round(grades) <= 10 && (
        <div className="grades">C</div>
      )}
      {Math.round(grades) >= 11 && Math.round(grades) <= 13 && (
        <div className="grades">B</div>
      )}
      {Math.round(grades) >= 14 && Math.round(grades) <= 16 && (
        <div className="grades">A</div>
      )}
      {Math.round(grades) >= 17 && Math.round(grades) <= 20 && (
        <div className="grades">AD</div>
      )}
      {grades > 10 && (
        <div className="approved">
          <img src={imgApproved} alt="" />
        </div>
      )}
    </div>
  );
};

export default ParticipantEvaluationDetail;
