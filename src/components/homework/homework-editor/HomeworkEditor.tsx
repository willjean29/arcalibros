import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { homeworkResetExcercises } from "../../../store/homework/homework.actions";
import { RootStore } from "../../../store/store";
import FormCreateHomework from "../FormCreateHomework";
import ItemQuestionBankHomework from "../homework-bank/ItemQuestionBankHomework";

const HomeworkEditor = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const homeworkExcercises = useSelector(
    (state: RootStore) => state.homework.newHomeworkExcercises
  );
  useEffect(() => {
    dispatch(homeworkResetExcercises());
  }, [location]);
  return (
    <>
      <FormCreateHomework homeworkExcercises={homeworkExcercises} />
      {homeworkExcercises.map((excercise, index) => (
        <ItemQuestionBankHomework
          key={index}
          excercise={excercise}
          index={index}
        />
      ))}
    </>
  );
};

export default HomeworkEditor;
