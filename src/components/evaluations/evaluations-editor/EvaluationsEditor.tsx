import React, { useEffect, useState } from "react";
import FormCreateEvaluation from "../FormCreateEvaluation";

import ItemQuestionBankExam from "../../evaluations/evaluations-bank/ItemQuestionBankExam";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../store/store";

import { useLocation } from "react-router-dom";
import { examResetExcercises } from "../../../store/exam/exam.actions";

const EvaluationsEditor = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const examExcercises = useSelector(
    (state: RootStore) => state.exam.newExamExcercises
  );

  useEffect(() => {
    dispatch(examResetExcercises());
  }, [location]);
  return (
    <>
      <FormCreateEvaluation examExcercises={examExcercises} />
      {examExcercises.map((excercise, index) => (
        <ItemQuestionBankExam key={index} excercise={excercise} index={index} />
      ))}
    </>
  );
};

export default EvaluationsEditor;
