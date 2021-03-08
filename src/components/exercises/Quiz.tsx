import React, { useEffect, useState } from "react";
import Question from "./Question";
import Alternative from "./Alternative";
import Button from "../button/Button";
import DragAndDrop from "./drag-and-drop/DragAndDrop";
import Selection from "./selection/Selection";
import FillIn from "./fill-blank/FillBlank";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { Excercise } from "../../store/excercise/interfaces/exercise.interface";
import Loading from "../loading/Loading";

const Quiz = () => {
  const [actualExcercise, setActualExcercise] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const actualExam = useSelector((state: RootStore) => state.exam.actualExam);
  const actualExamExcerciseId = useSelector(
    (state: RootStore) => state.exam.actualExamExcerciseId
  );

  const filterExcercise = () => {
    const actualExcercise = actualExam?.excercises.find(
      (excercise) => excercise._id === actualExamExcerciseId
    ) as Excercise;
    if (actualExcercise !== undefined) {
      setLoaded(true);
      switch (actualExcercise.type) {
        case 1:
          return <Selection excercise={actualExcercise} />;
        case 2:
          return <DragAndDrop excercise={actualExcercise} />;
        case 3:
          return <FillIn excercise={actualExcercise} />;
      }
    }
  };
  useEffect(() => {
    if (actualExam !== null) {
      setActualExcercise(filterExcercise);
    }
  }, [actualExamExcerciseId]);
  return loaded ? (
    <div className="main-quiz-container">
      {actualExcercise !== null ? actualExcercise : null}
    </div>
  ) : (
    <Loading />
  );
};

export default Quiz;
