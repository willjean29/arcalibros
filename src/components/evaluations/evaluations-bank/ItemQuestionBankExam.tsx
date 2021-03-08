import React, { MouseEvent } from "react";

import imgTrash from "../../../assets/icons/trash.png";
import imgEdit from "../../../assets/icons/pen-edit.png";
import imgTag from "../../../assets/icons/tag.png";
import { Excercise } from "../../../store/excercise/interfaces/exercise.interface";
import { useDispatch } from "react-redux";
import { examDeleteExcercise } from "../../../store/exam/exam.actions";

interface IProps {
  excercise: Excercise;
  index: number;
}
const ItemQuestionBankExam: React.FC<IProps> = ({ excercise, index }) => {
  const dispatch = useDispatch();
  const handleDeleteExcercise = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(examDeleteExcercise(excercise));
  };

  return (
    <div className="question-bank-item">
      <div className="question-bank-header">
        <div className="left-content">
          <div className="type-of-question">
            <img src="" alt="" />
          </div>
          <h3>Pregunta {index + 1}</h3>
        </div>
        <div className="right-content">
          <div className="btn-delete" onClick={handleDeleteExcercise}>
            <img src={imgTrash} alt="" />
          </div>
        </div>
      </div>
      <div className="question-bank-body">
        <h3 className="question">{excercise.statement}</h3>
      </div>
      <hr />
      <div className="question-bank-footer">
        <div className="course-tag">
          <img src={imgTag} alt="" />
          {excercise.course}
        </div>
      </div>
    </div>
  );
};

export default ItemQuestionBankExam;
