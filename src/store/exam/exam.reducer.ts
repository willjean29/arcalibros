import { Excercise } from "../excercise/interfaces/exercise.interface";
import {
  ExamDispatchTypes,
  EXAMS_CLASSROOM_ADD,
  EXAMS_CLASSROOM_DELETE,
  EXAMS_CLASSROOM_LOAD,
  EXAMS_LOAD,
  EXAM_ADD_EXCERCISE,
  EXAM_CLASSROOM_ANSWER,
  EXAM_CLASSROOM_ANSWER_EXAM,
  EXAM_CLASSROOM_CLEAR,
  EXAM_CLASSROOM_EXCERCISE,
  EXAM_CLASSROOM_EXCERCISE_ID,
  EXAM_CLASSROOM_LOAD,
  EXAM_CLASSROOM_RESULTS_LOAD,
  EXAM_CLASSROOM_STATE,
  EXAM_CREATE,
  EXAM_DELETE,
  EXAM_DELETE_EXCERCISE,
  EXAM_EXCERCISE_RESET,
  EXAM_LOAD,
} from "./exam.types";
import { AnswerExam } from "./interfaces/answer-exam.interface";
import { AnswerExcercise } from "./interfaces/answer-excercise.interface";
import { ExamClassroom } from "./interfaces/exam-classroom.interface";
import { IState } from "./interfaces/exam-state.interface";
import { Exam } from "./interfaces/exam.interface";

const defaultState: IState = {
  exams: [] as Exam[],
  newExamExcercises: [] as Excercise[],
  examsClassroom: [] as ExamClassroom[],
  actualExam: null,
  actualExamClassroom: null,
  actualExamExcercise: 0,
  actualExamAnswers: [] as AnswerExcercise[],
  actualExamResults: [] as AnswerExam[],
  actualExamExcerciseId: "",
};

export const examReducer = (
  state: IState = defaultState,
  action: ExamDispatchTypes
) => {
  switch (action.type) {
    case EXAM_CREATE:
      return { ...state, exams: [...state.exams, action.payload] };
    case EXAM_ADD_EXCERCISE:
      return {
        ...state,
        newExamExcercises: [...state.newExamExcercises, action.payload],
      };
    case EXAM_DELETE_EXCERCISE:
      return {
        ...state,
        newExamExcercises: action.payload,
      };
    case EXAMS_LOAD:
      return { ...state, exams: action.payload };
    case EXAM_EXCERCISE_RESET:
      return { ...state, newExamExcercises: action.payload };

    case EXAMS_CLASSROOM_LOAD:
      return { ...state, examsClassroom: action.payload };

    case EXAMS_CLASSROOM_ADD:
      return {
        ...state,
        examsClassroom: [...state.examsClassroom, action.payload],
      };
    case EXAM_LOAD:
      return { ...state, actualExam: action.payload };

    case EXAM_CLASSROOM_LOAD:
      return { ...state, actualExamClassroom: action.payload };
    case EXAM_CLASSROOM_STATE:
      return {
        ...state,
        examsClassroom: action.payload,
      };
    case EXAM_CLASSROOM_EXCERCISE:
      return { ...state, actualExamExcercise: action.payload };

    case EXAM_CLASSROOM_EXCERCISE_ID:
      return { ...state, actualExamExcerciseId: action.payload };
    case EXAM_CLASSROOM_ANSWER:
      return {
        ...state,
        actualExamAnswers: [...state.actualExamAnswers, action.payload],
      };
    case EXAM_CLASSROOM_RESULTS_LOAD:
      return { ...state, actualExamResults: action.payload };
    case EXAM_CLASSROOM_ANSWER_EXAM:
      return {
        ...state,
        actualExamAnswers: [] as AnswerExcercise[],
        actualExam: null,
        actualExamClassroom: null,
        actualExamExcercise: 0,
      };

    case EXAMS_CLASSROOM_DELETE:
      return { ...state, examsClassroom: action.payload };
    case EXAM_CLASSROOM_CLEAR:
      return {
        ...state,
        actualExamAnswers: [] as AnswerExcercise[],
        actualExam: null,
        actualExamClassroom: null,
        actualExamExcercise: 0,
        actualExamExcerciseId: "",
      };
    case EXAM_DELETE:
      return { ...state, exams: action.payload };
    default:
      return state;
  }
};
