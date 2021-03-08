import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadExamClassroomResults } from "../../store/exam/exam.actions";
import { ExamClassroom } from "../../store/exam/interfaces/exam-classroom.interface";
import { RootStore } from "../../store/store";
import { Student } from "../../store/user/interfaces/student.interface";
import { UserType } from "../../utils/enums";
import NavbarEvaluationDetail from "../evaluations/NavbarEvaluationDetail";
import ParticipantEvaluationDetail from "../evaluations/ParticipantEvaluationDetail";
import PreviewEvaluationDetail from "../evaluations/PreviewEvaluationDetail";

const EvaluationDetail = () => {
  const param: any = useParams();
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useDispatch();
  const actualExamResults = useSelector(
    (state: RootStore) => state.exam.actualExamResults
  );
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  const userId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );

  useEffect(() => {
    dispatch(loadExamClassroomResults(param.id));
  }, []);
  useEffect(() => {}, [actualExamResults]);
  return actualExamResults.length !== 0 ? (
    (actualExamResults[0].examClassroom as ExamClassroom).active ? (
      <h3>La evaluación continua en ejecución</h3>
    ) : (
      <div className="evaluation-detail-page" ref={ref}>
        <div className="evaluation-detail-page-container global-container">
          <NavbarEvaluationDetail
            examClassroomName={
              (actualExamResults[0].examClassroom as ExamClassroom).name
            }
          />

          <PreviewEvaluationDetail
            answersExam={actualExamResults}
            targetRef={ref}
            examClassroomName={
              (actualExamResults[0].examClassroom as ExamClassroom).name
            }
          />

          <div className="participant-group">
            {userType === UserType.TEACHER
              ? actualExamResults.map((answerExam, index) => (
                  <ParticipantEvaluationDetail
                    key={index}
                    answerExam={answerExam}
                  />
                ))
              : actualExamResults
                  .filter(
                    (result) => (result.student as Student)._id === userId
                  )
                  .map((answerExam, index) => (
                    <ParticipantEvaluationDetail
                      key={index}
                      answerExam={answerExam}
                    />
                  ))}
          </div>
          <div></div>
        </div>
      </div>
    )
  ) : (
    <h3>Aún no hay resultados para esta evaluación</h3>
  );
};

export default EvaluationDetail;
