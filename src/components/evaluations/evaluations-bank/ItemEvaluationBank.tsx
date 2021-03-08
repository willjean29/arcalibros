import React, { useState } from "react";

import imgTrash from "../../../assets/icons/trash.png";
import imgEdit from "../../../assets/icons/pen-edit.png";
import imgTag from "../../../assets/icons/tag.png";
import Modal from "../../modal/Modal";
import ModalDeleteQuestionInEvaluation from "../../modal/ModalDeleteQuestionInEvaluation";
import { Exam } from "../../../store/exam/interfaces/exam.interface";
interface IProps {
  exam: Exam;
}

const ItemEvaluationBank: React.FC<IProps> = ({ exam }) => {
  const [
    modalDeleteQuestionInEvaluation,
    setModalDeleteQuestionInEvaluation,
  ] = useState(false);
  return (
    <div className="question-bank-item">
      <Modal modalOpen={modalDeleteQuestionInEvaluation}>
        <ModalDeleteQuestionInEvaluation
          deleteElement={exam._id as string}
          setModalOpen={setModalDeleteQuestionInEvaluation}
        />
      </Modal>
      <div className="question-bank-header">
        <div className="left-content">
          <div className="type-of-question">
            <img src="" alt="" />
          </div>
          <h3>{exam.name}</h3>
        </div>
        <div className="right-content">
          <div className="btn-edit">
            <img src={imgEdit} alt="" />
            <span>Editar</span>
          </div>
          <div
            className="btn-delete"
            onClick={() => setModalDeleteQuestionInEvaluation(true)}
          >
            <img src={imgTrash} alt="" />
          </div>
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
          {exam.level}
        </div>
      </div>
    </div>
  );
};

export default ItemEvaluationBank;
