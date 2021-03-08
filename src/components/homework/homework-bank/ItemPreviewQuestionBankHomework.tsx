import React, { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import imgAdd from "../../../assets/icons/add.png";
import imgEdit from "../../../assets/icons/pen-edit.png";
import imgTag from "../../../assets/icons/tag.png";
import { examAddExcercise } from "../../../store/exam/exam.actions";
import { Excercise } from "../../../store/excercise/interfaces/exercise.interface";
import { homeworkAddExcercise } from "../../../store/homework/homework.actions";
import { RootStore } from "../../../store/store";

interface IProps {
  excercise: Excercise;
  index: number;
}
const ItemPreviewQuestionBankHomework: React.FC<IProps> = ({
  excercise,
  index,
}) => {
  const dispatch = useDispatch();
  const newHomeworkExcercises = useSelector(
    (state: RootStore) => state.homework.newHomeworkExcercises
  );
  const [added, setAdded] = useState(false);
  const handleAddExcercise = (e: MouseEvent) => {
    e.preventDefault();
    if (!added) {
      dispatch(homeworkAddExcercise(excercise));
      setAdded(true);
    }
  };
  useEffect(() => {
    if (
      newHomeworkExcercises.find(
        (newExcercise) => excercise._id === newExcercise._id
      )
    ) {
      setAdded(true);
    }
  }, []);
  return (
    <div className="question-bank-item bordered">
      <div className="question-bank-header">
        <div className="left-content">
          <div className="type-of-question">
            <img src="" alt="" />
          </div>
          <h3>
            Pregunta {index + 1} {added ? "(Agregada)" : null}
          </h3>
        </div>
        <div className="right-content">
          {/* <div className="btn-edit" onClick={handleEditExcercise}>
            <img src={imgEdit} alt="" />
            <span>Editar</span>
          </div> */}
          <div className="btn-add" onClick={handleAddExcercise}>
            <img src={imgAdd} alt="" />
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

export default ItemPreviewQuestionBankHomework;
