import React from "react";
import { Excercise } from "../../store/excercise/interfaces/exercise.interface";

interface IProps {
  excercise: Excercise;
  index: number;
  onClicked: (e: any) => (index: number) => void;
}

const ClassroomQuizItem: React.FC<IProps> = ({
  excercise,
  index,
  onClicked,
}) => {
  return (
    <div className="question-item" onClick={onClicked}>
      <span>{index + 1}</span>
      <p>{excercise.statement}</p>
    </div>
  );
};

export default ClassroomQuizItem;
