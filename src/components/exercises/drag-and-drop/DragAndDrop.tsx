import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExamExcerciseAnswer } from "../../../store/exam/exam.actions";
import { AnswerExcercise } from "../../../store/exam/interfaces/answer-excercise.interface";
import { Excercise } from "../../../store/excercise/interfaces/exercise.interface";
import { RootStore } from "../../../store/store";
import BoxDnD from "./BoxDnD";
import ContainerDnD from "./ContainerDnD";
interface IProps {
  excercise: Excercise;
}
const DragAndDrop: React.FC<IProps> = ({ excercise }) => {
  const dispatch = useDispatch();

  const actualExamAnswers = useSelector(
    (state: RootStore) => state.exam.actualExamAnswers
  );

  const answerArray = [] as boolean[];
  const drop = (e: any) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id) as HTMLElement;
    card.style.display = "flex";
    card.draggable = false;

    const dragGroup = excercise.dragGroups?.findIndex(
      (drag) => drag === e.target.id
    );
    const cardId = parseInt(card_id);
    if (cardId == (dragGroup as number) + 1) {
      answerArray.push(true);
    } else {
      answerArray.push(false);
    }

    e.target.appendChild(card);
  };
  const dragOver = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {}, [actualExamAnswers]);
  const dragStart = (e: any) => {
    const target = e.target;

    e.dataTransfer.setData("card_id", target.id);
    if (target.draggable) {
      setTimeout(() => {
        target.style.display = "none";
      }, 0);
    }
  };

  const dragOverOption = (e: any) => {
    e.stopPropagation();
  };
  const dragEnd = (e: any) => {
    const target = e.target;
    target.style.display = "flex";
  };
  const handleReset = (e: any) => {};
  const handleAnswer = () => {
    if (answerArray.length === excercise.alternatives.length) {
      if (answerArray.find((value) => value === false) === undefined) {
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
    }
  };

  return (
    <div className="quiz-container">
      <div className="drag-and-drop-container">
        <ContainerDnD id="opciones" className="options-container">
          {excercise.alternatives.map((alternative, index) => (
            <BoxDnD
              key={index}
              id={alternative.dragGroup as string}
              draggable={
                actualExamAnswers.find(
                  (answer) => answer.excercise === excercise._id
                ) !== undefined
                  ? "false"
                  : "true"
              }
              dragStart={dragStart}
              dragEnd={dragEnd}
              dragOverOption={dragOverOption}
              boxName={alternative.text}
            />
          ))}
        </ContainerDnD>
        <div className="drag-and-drop-boxes">
          {excercise.dragGroups?.map((dragGroup, index) => (
            <ContainerDnD
              key={index}
              id={dragGroup}
              className="dnd-container"
              drop={drop}
              dragOver={dragOver}
            ></ContainerDnD>
          ))}
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
              : handleAnswer
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
              : handleReset
          }
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default DragAndDrop;
