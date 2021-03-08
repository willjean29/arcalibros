import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadExams } from "../../../store/exam/exam.actions";
import { Exam } from "../../../store/exam/interfaces/exam.interface";
import { RootStore } from "../../../store/store";
import ItemEvaluationBank from "./ItemEvaluationBank";
import SelectEvaluationBank from "./SelectEvaluationBank";

const EvaluationsBank = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const teacherId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const exams = useSelector((state: RootStore) => state.exam.exams);
  const [filterCourse, setFilterCourse] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [filteredEvaluations, setFilteredEvaluations] = useState([] as Exam[]);
  useEffect(() => {
    dispatch(loadExams(teacherId));
  }, [location]);
  useEffect(() => {
    if (exams) {
      filterArray();
    }
  }, [filterCourse, exams]);
  const filterArray = () => {
    setFilteredEvaluations(
      exams.filter((exam) => exam.course === filterCourse)
    );
  };
  const filterArrayLevel = () => {
    setFilteredEvaluations(
      filteredEvaluations.filter((exam) => exam.grade === filterGrade)
    );
  };

  return (
    <div className="my-evaluation-bank">
      <SelectEvaluationBank
        setFilterCourse={setFilterCourse}
        setFilterLevel={setFilterGrade}
      />
      {filteredEvaluations &&
        filteredEvaluations.map((exam, index) => (
          <ItemEvaluationBank exam={exam} key={index} />
        ))}
    </div>
  );
};

export default EvaluationsBank;
