import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExamExcerciseAnswer } from "../../../store/exam/exam.actions";
import { AnswerExcercise } from "../../../store/exam/interfaces/answer-excercise.interface";
import { Excercise } from "../../../store/excercise/interfaces/exercise.interface";
import { RootStore } from "../../../store/store";
import Button from "../../button/Button";
import Question from "../Question";

interface IProps {
  excercise: Excercise;
}
const FillIn: React.FC<IProps> = ({ excercise }) => {
  const dispatch = useDispatch();
  const [textAnswer, setTextAnswer] = useState("");

  const actualExamAnswers = useSelector(
    (state: RootStore) => state.exam.actualExamAnswers
  );

  useEffect(() => {}, [actualExamAnswers]);
  function similar(a: string, b: string) {
    var equivalency = 0;
    var minLength = a.length > b.length ? b.length : a.length;
    var maxLength = a.length < b.length ? b.length : a.length;
    for (var i = 0; i < minLength; i++) {
      if (a[i] == b[i]) {
        equivalency++;
      }
    }

    var weight = equivalency / maxLength;
    return weight * 100;
  }
  const handleFillBankAnswer = (e: any) => {
    e.preventDefault();
    if (
      similar(
        (excercise.fillAnswer as string).toLowerCase(),
        textAnswer.toLowerCase()
      ) >= 90
    ) {
      const answer = {
        excercise: excercise._id,
        correct: true,
      };
      dispatch(addExamExcerciseAnswer(answer));
    } else {
      const answer = {
        excercise: excercise._id,
        correct: false,
      };
      dispatch(addExamExcerciseAnswer(answer));
    }
  };
  const handleResetFillBlank = (e: any) => {
    e.preventDefault();
    setTextAnswer("");
  };
  return (
    <div className="quiz-container">
      <Question text={excercise.statement} />
      <div className="image">
        <img
          src={excercise.photo ? (excercise.photo as string) : undefined}
          alt=""
        />
      </div>
      <div className="input-container">
        <div className="principal-input">
          <input
            type="text"
            placeholder="Escribe tu respuesta"
            onChange={(e) =>
              actualExamAnswers.find(
                (answer) => answer.excercise === excercise._id
              ) !== undefined
                ? () => {}
                : setTextAnswer(e.target.value)
            }
            readOnly={
              actualExamAnswers.find(
                (answer) => answer.excercise === excercise._id
              ) !== undefined
                ? true
                : false
            }
          />
        </div>
      </div>

      <div className="footer-container">
        <button
          className="btn-answer"
          onClick={
            actualExamAnswers.find(
              (answer) => answer.excercise === excercise._id
            ) !== undefined
              ? () => {}
              : handleFillBankAnswer
          }
        >
          Enviar respuesta
        </button>
        <button
          className="btn-restart"
          onClick={
            actualExamAnswers.find(
              (answer) => answer.excercise === excercise._id
            ) !== undefined
              ? () => {}
              : handleResetFillBlank
          }
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default FillIn;
