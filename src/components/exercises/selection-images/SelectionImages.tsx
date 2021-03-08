import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExercisesPage from "../../../pages/ExercisesPage";
import { addExamExcerciseAnswer } from "../../../store/exam/exam.actions";
import { AnswerExcercise } from "../../../store/exam/interfaces/answer-excercise.interface";
import { Excercise } from "../../../store/excercise/interfaces/exercise.interface";
import { RootStore } from "../../../store/store";
import Button from "../../button/Button";
import Alternative from "../Alternative";
import Question from "../Question";

interface IProps {
  excercise: Excercise;
}
const Selection: React.FC<IProps> = ({ excercise }) => {
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const actualExamAnswers = useSelector(
    (state: RootStore) => state.exam.actualExamAnswers
  );
  useEffect(() => {}, [actualExamAnswers]);

  const handleResetSelection = (e: any) => {
    e.preventDefault();
    setSelectedAnswer("");
  };
  const handleSelectionAnswer = (e: any) => {
    e.preventDefault();
    if (excercise.selectionAnswer === selectedAnswer) {
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
  function shuffle(array: any[]) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  return (
    <div className="quiz-container">
      <Question text={excercise.statement} />
      <div className="image">
        <img
          src={excercise.photo ? (excercise.photo as string) : undefined}
          alt=""
        />
      </div>
      <div className="alternative-container dos">
        {excercise.alternatives.map((alternative, index) => (
          <Alternative
            key={index}
            text={alternative.text}
            className={
              selectedAnswer === alternative._id
                ? "alternative selected"
                : "alternative"
            }
            onClicked={(e: any) =>
              actualExamAnswers.find(
                (answer) => answer.excercise === excercise._id
              ) !== undefined
                ? () => {}
                : setSelectedAnswer(alternative._id)
            }
          />
        ))}
      </div>
      <div className="footer-container">
        <button
          className="btn-answer"
          onClick={
            actualExamAnswers.find(
              (answer) => answer.excercise === excercise._id
            ) !== undefined
              ? () => {}
              : handleSelectionAnswer
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
              : handleResetSelection
          }
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Selection;
