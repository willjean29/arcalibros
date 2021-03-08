import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import QuizEditor from "../components/exercises/quiz-editor/QuizEditor";
import ButtonPaintMe from "../components/paintme/ButtonPaintMe";
import Paintme from "../components/paintme/Paintme";
import { loadExcercises } from "../store/excercise/excercise.actions";
import { RootStore } from "../store/store";

const ExercisesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const teacherId = useSelector((state:RootStore)=>state.user.user?._id) as string;
  useEffect(() => {
    dispatch(loadExcercises(teacherId));
  }, [location]);
  return (
    <div className="exercise-container">
      
      <QuizEditor />

      {/* <ButtonPaintMe /> */}
      {/* <Paintme /> */}
    </div>
  );
};

export default ExercisesPage;
