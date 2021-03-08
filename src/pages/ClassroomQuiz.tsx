import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, StaticRouter, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ClassroomQuizItem from "../components/exercises/ClassroomQuizItem";
import Quiz from "../components/exercises/Quiz";
import Loading from "../components/loading/Loading";
import Modal from "../components/modal/Modal";
import ModalExameSent from "../components/modal/ModalExamSent";
import {
  changeExamClassroomState,
  changeExcercise,
  changeExcerciseId,
  examClassroomClear,
  finishExamClassroom,
  loadExamClassroom,
  sendExamAnswer,
} from "../store/exam/exam.actions";
import { AnswerExcercise } from "../store/exam/interfaces/answer-excercise.interface";
import { ExamClassroom } from "../store/exam/interfaces/exam-classroom.interface";
import { RootStore } from "../store/store";
import { SocketEvent, UserType } from "../utils/enums";
import { socket } from "../utils/sockets";

import imgMenu from "../assets/icons/menu.svg";
import { Excercise } from "../store/excercise/interfaces/exercise.interface";
import moment from "moment";

const ClassroomQuiz = () => {
  const [modalExamSent, setModalExamSent] = useState(false);
  const [showNavQuestions, setShowNavQuestions] = useState(false);
  const [answerExam, setAnswerExam] = useState<any>({});
  const [finished, setFinished] = useState(false);
  const dispatch = useDispatch();
  const param: any = useParams();
  const actualExam = useSelector((state: RootStore) => state.exam.actualExam);
  const student = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const examClassroom = useSelector(
    (state: RootStore) => state.exam.actualExamClassroom?._id as string
  );
  const answers = useSelector(
    (state: RootStore) => state.exam.actualExamAnswers
  );

  const actualExamAnswers = useSelector(
    (state: RootStore) => state.exam.actualExamAnswers
  );

  const actualExamClassroom = useSelector(
    (state: RootStore) => state.exam.actualExamClassroom
  );

  const clock = useSelector((state: RootStore) => state.ui.clock);

  const showPaintMeApp = () => {
    const myPaintme = document.getElementById("paintme") as HTMLElement;
    myPaintme.classList.toggle("show");
  };
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  useEffect(() => {
    dispatch(loadExamClassroom(param.id));
  }, []);

  // useEffect(() => {
  //   if (actualExam !== null) {
  //     dispatch(changeExcerciseId(actualExam.excercises[0]._id));
  //   }
  // }, [actualExam]);
  useEffect(() => {}, [actualExamAnswers]);
  const handleClickedQuestion = (e: any, excerciseId: string) => {
    e.preventDefault();
    dispatch(changeExcerciseId(excerciseId));
    setShowNavQuestions(false);
  };
  useEffect(() => {
    const toastOptions = {
      autoClose: 15000,
      closeOnClick: true,
      hideProgressBar: true,
    };
    const serverHour = moment(clock, "MMMM Do YYYY, h:mm:ss a").format(
      "MMMM Do YYYY, h:mm:ss a"
    );

    const finishHour = moment(
      actualExamClassroom?.finishDate,
      "MMMM Do YYYY, h:mm:ss a"
    ).format("MMMM Do YYYY, h:mm:ss a");
    const fiveMinutesLeft = moment(finishHour, "MMMM Do YYYY, h:mm:ss a")
      .subtract(5, "minutes")
      .format("MMMM Do YYYY, h:mm:ss a");
    if (fiveMinutesLeft === serverHour) {
      toast.info(
        `${actualExamClassroom?.name} termina en 5 minutos`,
        toastOptions
      );
    }
    if (finishHour === serverHour) {
      dispatch(finishExamClassroom(actualExamClassroom?._id as string));
      dispatch(
        changeExamClassroomState(actualExamClassroom?._id as string, false)
      );
      setFinished(true);
      toast.error(`${actualExamClassroom?.name} ha finalizado`, toastOptions);
    }
  }, [clock]);
  useEffect(() => {
    socket.users.on(
      SocketEvent.ExamClassroomFinish,
      (examClassroom: ExamClassroom) => {
        const toastOptions = {
          autoClose: 15000,
          closeOnClick: true,
          hideProgressBar: true,
        };
        toast.error(`${examClassroom.name} ha finalizado`, toastOptions);
        setFinished(true);
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(examClassroomClear());
    };
  }, []);

  useEffect(() => {
    if (actualExamAnswers.length === actualExam?.excercises.length) {
      toast.info("Constestó todas las preguntas, envíe el examen");
    }
  }, [actualExamAnswers]);
  function shuffle(array: Excercise[]) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  const handleSendExam = (e: any) => {
    e.preventDefault();
    const correctAnswers = answers.filter((answer) => answer.correct === true);
    const incorrectAnswers = answers.filter(
      (answer) => answer.correct === false
    );
    const answerExam = {
      student,
      examClassroom,
      answers,
      correct: correctAnswers.length,
      incorrect: incorrectAnswers.length,
    };
    setAnswerExam(answerExam);
    setModalExamSent(true);
  };
  return actualExamClassroom?.active ? (
    actualExam === null ? (
      <Loading />
    ) : (
      <div>
        <Modal modalOpen={modalExamSent}>
          <ModalExameSent
            setModalOpen={setModalExamSent}
            answerExam={answerExam}
          />
        </Modal>
        <div
          className={
            showNavQuestions === true
              ? "classroom-quiz responsive show"
              : "classroom-quiz responsive"
          }
        >
          <div
            className="btn-show-questions"
            onClick={() => setShowNavQuestions(true)}
          >
            <img src={imgMenu} alt="" />
          </div>
          <div className="classroom-quiz-questions">
            <div className="nav-questions">
              <h2>Preguntas</h2>
              <span onClick={() => setShowNavQuestions(false)}>x</span>
            </div>
            <div className="questions-box">
              {actualExam.excercises.map((excercise, index) => (
                <div
                  className={
                    actualExamAnswers.filter(
                      (answer) => answer.excercise === excercise._id
                    ).length !== 0
                      ? "question-item answered"
                      : "question-item"
                  }
                  onClick={
                    actualExamAnswers.filter(
                      (answer) => answer.excercise === excercise._id
                    ).length !== 0
                      ? () => {}
                      : (e) => handleClickedQuestion(e, excercise._id)
                  }
                  key={index}
                >
                  <span>{index + 1}</span>
                  <p>{excercise.statement}</p>
                </div>
              ))}
            </div>
            {userType === UserType.TEACHER ? null : (
              <button
                className="btn-send-exam"
                onClick={finished === true ? () => {} : handleSendExam}
              >
                ENVIAR EXAMEN
              </button>
            )}

            {finished === true || userType === UserType.TEACHER ? (
              <div className="teacher-buttons">
                <button className="btn-board" onClick={showPaintMeApp}>
                  Pizarra
                </button>
                <Link to="/plataforma">
                  <button className="btn-return-exam">VOLVER</button>
                </Link>
              </div>
            ) : null}
          </div>
          <div className="classroom-quiz-exercises">
            <Quiz />
          </div>
        </div>
        {/* <ToastContainer limit={1} /> */}
      </div>
    )
  ) : (
    <h3>El examen aun no comienza</h3>
  );
};

export default ClassroomQuiz;
