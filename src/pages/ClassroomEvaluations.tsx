import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import EvaluationCard from "../components/classroom/EvaluationCard";
import EvaluationDetail from "../components/classroom/EvaluationDetail";
import EvaluationOptions from "../components/classroom/EvaluationOptions";
import Modal from "../components/modal/Modal";
import { loadExams, loadExamsClassroom } from "../store/exam/exam.actions";
import { RootStore } from "../store/store";

const ClassroomEvaluations = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const teacherId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const classroomId = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom?._id as string
  );

  const examsClassroom = useSelector(
    (state: RootStore) => state.exam.examsClassroom
  );
  useEffect(() => {
    dispatch(loadExams(teacherId));
    dispatch(loadExamsClassroom(classroomId));
  }, [location]);

  useEffect(() => {}, [examsClassroom]);
  return (
    <>
      <div className="topic-page">
        <div className="topic-page-container container">
          <div className="topics-container">
            <EvaluationOptions />
            {examsClassroom &&
              examsClassroom.map((examClassroom, index) => (
                <EvaluationCard examClassroom={examClassroom} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassroomEvaluations;
