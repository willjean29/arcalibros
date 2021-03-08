import React from "react";

import imgTrash from "../../../assets/icons/trash.png";
import imgEdit from "../../../assets/icons/pen-edit.png";
import imgTag from "../../../assets/icons/tag.png";
import { Homework } from "../../../store/homework/interfaces/homework.interface";
interface IProps {
  homework: Homework;
}
const ItemHomeworkBank: React.FC<IProps> = ({ homework }) => {
  return (
    <div className="question-bank-item">
      <div className="question-bank-header">
        <div className="left-content">
          <div className="type-of-question">
            <img src="" alt="" />
          </div>
          <h3>{homework.name}</h3>
        </div>
        <div className="right-content">
          <div className="btn-edit">
            <img src={imgEdit} alt="" />
            <span>Editar</span>
          </div>
          <div className="btn-delete">
            <img src={imgTrash} alt="" />
          </div>
        </div>
      </div>
      <div className="question-bank-footer">
        <div className="course-tag">
          <img src={imgTag} alt="" />
          {homework.course}
        </div>
        <div className="course-tag">
          <img src={imgTag} alt="" />
          {homework.grade}
        </div>
        <div className="course-tag">
          <img src={imgTag} alt="" />
          Primaria
        </div>
      </div>
    </div>
  );
};

export default ItemHomeworkBank;
