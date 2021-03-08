import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { ExcerciseDto } from "../excercise/dtos/excercise.dto";
import { Excercise } from "../excercise/interfaces/exercise.interface";
import { RootStore } from "../store";
import {
  ExamDispatchTypes,
  EXAMS_CLASSROOM_ADD,
  EXAMS_CLASSROOM_DELETE,
  EXAMS_CLASSROOM_LOAD,
  EXAMS_LOAD,
  examURL,
  EXAM_ADD_EXCERCISE,
  EXAM_CLASSROOM_ANSWER,
  EXAM_CLASSROOM_ANSWER_EXAM,
  EXAM_CLASSROOM_CLEAR,
  EXAM_CLASSROOM_EXCERCISE,
  EXAM_CLASSROOM_EXCERCISE_ID,
  EXAM_CLASSROOM_FINISH,
  EXAM_CLASSROOM_LOAD,
  EXAM_CLASSROOM_RESULTS_LOAD,
  EXAM_CLASSROOM_START,
  EXAM_CLASSROOM_STATE,
  EXAM_DELETE,
  EXAM_DELETE_EXCERCISE,
  EXAM_EXCERCISE_RESET,
  EXAM_LOAD,
} from "./exam.types";
import { AnswerExam } from "./interfaces/answer-exam.interface";
import { AnswerExcercise } from "./interfaces/answer-excercise.interface";
import { ExamClassroom } from "./interfaces/exam-classroom.interface";
import { Exam } from "./interfaces/exam.interface";

export const examAddExcercise = (excercise: Excercise) => (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  dispatch({
    type: EXAM_ADD_EXCERCISE,
    payload: excercise,
  });
};

export const examDeleteExcercise = (excercise: Excercise) => (
  dispatch: Dispatch<ExamDispatchTypes>,
  getState: () => RootStore
) => {
  const newExamExcercises = getState().exam.newExamExcercises;
  const filterExamExcercises = newExamExcercises.filter(
    (excerciseExam) => excercise._id !== excerciseExam._id
  );
  dispatch({
    type: EXAM_DELETE_EXCERCISE,
    payload: filterExamExcercises,
  });
};

export const createExam = (exam: Exam) => (
  dispatch: Dispatch<ExamDispatchTypes>,
  getState: () => RootStore
) => {
  try {
  } catch (error) {}
};

export const loadExams = (teacherId: string) => async (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  try {
    const res = await axios.get(examURL.concat(teacherId));

    if (res.data.exams) {
      dispatch({
        type: EXAMS_LOAD,
        payload: res.data.exams,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const loadExamsClassroom = (classroomId: string) => async (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  try {
    const res = await axios.get(examURL.concat("classroom/" + classroomId));

    if (res.data.examsClassroom) {
      dispatch({
        type: EXAMS_CLASSROOM_LOAD,
        payload: res.data.examsClassroom,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const addExamsClassroom = (examClassroom: ExamClassroom) => async (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  dispatch({
    type: EXAMS_CLASSROOM_ADD,
    payload: examClassroom,
  });
};

export const examResetExcercises = () => (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  dispatch({
    type: EXAM_EXCERCISE_RESET,
    payload: [] as Excercise[],
  });
};

export const loadExamClassroom = (examClassroomId: string) => async (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  try {
    const res = await axios.get(
      examURL.concat("classroom/get/" + examClassroomId)
    );

    if (res.data.examClassroom) {
      dispatch({
        type: EXAM_CLASSROOM_LOAD,
        payload: res.data.examClassroom,
      });
      const resExam = await axios.get(
        examURL.concat("get/" + res.data.examClassroom.exam)
      );
      if (resExam.data.exam) {
        dispatch({
          type: EXAM_LOAD,
          payload: resExam.data.exam,
        });
        dispatch({
          type: EXAM_CLASSROOM_EXCERCISE_ID,
          payload: resExam.data.exam.excercises[0]._id,
        });
      }
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const startExamClassroom = (
  examClassroomId: string,
  startExamDto: { startDate: string; finishDate: string }
) => async (dispatch: Dispatch<ExamDispatchTypes>) => {
  try {
    const res = await axios.post(
      examURL.concat("classroom/start/" + examClassroomId),
      startExamDto
    );

    if (res.data.examClassroom) {
      dispatch({
        type: EXAM_CLASSROOM_START,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const finishExamClassroom = (examClassroomId: string) => async (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  try {
    const res = await axios.get(
      examURL.concat("classroom/finish/" + examClassroomId)
    );

    if (res.data.examClassroom) {
      dispatch({
        type: EXAM_CLASSROOM_FINISH,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const changeExamClassroomState = (
  examClassroomId: string,
  state: boolean
) => async (
  dispatch: Dispatch<ExamDispatchTypes>,
  getState: () => RootStore
) => {
  const examsClassroom = getState().exam.examsClassroom;
  const newExamsClassroom = examsClassroom.map((examClassroom) =>
    examClassroom._id !== examClassroomId
      ? examClassroom
      : { ...examClassroom, active: state }
  );
  dispatch({
    type: EXAM_CLASSROOM_STATE,
    payload: newExamsClassroom,
  });
};

export const changeExamClassroomDate = (
  examClassroomId: string,
  startExamDto: { startDate: string; finishDate: string }
) => async (
  dispatch: Dispatch<ExamDispatchTypes>,
  getState: () => RootStore
) => {
  const examsClassroom = getState().exam.examsClassroom;
  const newExamsClassroom = examsClassroom.map((examClassroom) =>
    examClassroom._id !== examClassroomId
      ? examClassroom
      : {
          ...examClassroom,
          startDate: startExamDto.startDate,
          finishDate: startExamDto.finishDate,
        }
  );
  dispatch({
    type: EXAM_CLASSROOM_STATE,
    payload: newExamsClassroom,
  });
};

export const changeExcercise = (excerciseIndex: number) => (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  dispatch({
    type: EXAM_CLASSROOM_EXCERCISE,
    payload: excerciseIndex,
  });
};

export const changeExcerciseId = (excerciseId: string) => (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  dispatch({
    type: EXAM_CLASSROOM_EXCERCISE_ID,
    payload: excerciseId,
  });
};

export const addExamExcerciseAnswer = (excerciseAnswer: AnswerExcercise) => (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  dispatch({
    type: EXAM_CLASSROOM_ANSWER,
    payload: excerciseAnswer,
  });
};

export const sendExamAnswer = (answerExam: AnswerExam) => async (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  try {
    const res = await axios.post(examURL.concat("answer"), answerExam);

    if (res.data.answerExam) {
      dispatch({
        type: EXAM_CLASSROOM_ANSWER_EXAM,
      });

      toast.success("Evaluación enviada");
    } else {
      toast.error("Error al enviar evaluación");
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
    toast.error("Error, evaluación ya resuelta");
  }
};

export const loadExamClassroomResults = (examClassroomId: string) => async (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  try {
    const res = await axios.get(examURL.concat("answers/" + examClassroomId));

    if (res.data.examsClassroomsAnswers) {
      dispatch({
        type: EXAM_CLASSROOM_RESULTS_LOAD,
        payload: res.data.examsClassroomsAnswers,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const deleteExamClassroom = (examClassroomId: string) => async (
  dispatch: Dispatch<ExamDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    const res = await axios.delete(
      examURL.concat("classroom/" + examClassroomId)
    );
    const examsClassroom = getState().exam.examsClassroom;
    const newExamsClassroom = examsClassroom.filter(
      (exam) => exam._id !== examClassroomId
    );
    if (res.data.examClassroom) {
      toast.success("Examen eliminado con éxito");
      dispatch({
        type: EXAMS_CLASSROOM_DELETE,
        payload: newExamsClassroom,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    toast.error("Error al eliminar examen");
    console.log(errorAxios.message);
  }
};

export const examClassroomClear = () => (
  dispatch: Dispatch<ExamDispatchTypes>
) => {
  dispatch({
    type: EXAM_CLASSROOM_CLEAR,
  });
};

export const deleteExam = (examId: string) => async (
  dispatch: Dispatch<ExamDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    const res = await axios.delete(examURL.concat(examId));
    const exams = getState().exam.exams;
    const newExams = exams.filter((exam) => exam._id !== examId);
    if (res.data.exam) {
      dispatch({
        type: EXAM_DELETE,
        payload: newExams,
      });
      toast.success("Examen borrado");
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
    toast.error("Error al borrar examen");
  }
};

export const deleteSocketExam = (examId: string) => async (
  dispatch: Dispatch<ExamDispatchTypes>,
  getState: () => RootStore
) => {
  const examsClassroom = getState().exam.examsClassroom;
  const newExams = examsClassroom.filter((exam) => exam._id !== examId);

  dispatch({
    type: EXAMS_CLASSROOM_DELETE,
    payload: newExams,
  });
};
