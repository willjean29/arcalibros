import React from "react";

import imgTag from "../../../assets/icons/tag.png";

import { Exam } from "../../../store/exam/interfaces/exam.interface";
interface IProps {
  exam: Exam;
  onSelection: (e: any, index: number) => void;
  index: number;
  selected: boolean;
}

const ItemEvaluationClassroom: React.FC<IProps> = ({
  exam,
  onSelection,
  index,
  selected,
}) => {
  return (
    <div className={selected ? "question-bank-item modal-item selected" : "question-bank-item modal-item"} onClick={(e) => onSelection(e, index)}>
      <div className="question-bank-header">
        <div className="left-content">
          <div className="type-of-question">
            <img src="" alt="" />
          </div>
          <h3>
            {exam.name} {selected ? "(Seleccionado)" : null}
          </h3>
        </div>
      </div>
      <div className="question-bank-footer">
        <div className="course-tag">
          <img src={imgTag} alt="" />
          {exam.course}
        </div>
        <div className="course-tag">
          <img src={imgTag} alt="" />
          {exam.grade}
        </div>
        <div className="course-tag">
          <img src={imgTag} alt="" />
          Primaria
        </div>
      </div>
    </div>
  );
};

export default ItemEvaluationClassroom;
