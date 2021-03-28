import { EACCES } from "constants";
import { ExcerciseDto } from "../excercise/dtos/excercise.dto";
import { Excercise } from "../excercise/interfaces/exercise.interface";
import { AnswerExam } from "./interfaces/answer-exam.interface";
import { AnswerExcercise } from "./interfaces/answer-excercise.interface";
import { ExamClassroom } from "./interfaces/exam-classroom.interface";
import { Exam } from "./interfaces/exam.interface";

export const examURL = "https://meet.arcavirtual.net/evaluations/exam/";

export const EXAM_CREATE = "EXAM_CREATE";
export const EXAM_ADD_EXCERCISE = "EXAM_ADD_EXCERCISE";
export const EXAM_DELETE_EXCERCISE = "EXAM_DELETE_EXCERCISE";
export const EXAMS_LOAD = "EXAMS_LOAD";
export const EXAM_EXCERCISE_RESET = "EXAM_EXCERCISE_RESET";
export const EXAMS_CLASSROOM_LOAD = "EXAMS_CLASSROOM_LOAD";
export const EXAMS_CLASSROOM_ADD = "EXAMS_CLASSROOM_ADD";
export const EXAM_LOAD = "EXAM_LOAD";
export const EXAM_CLASSROOM_LOAD = "EXAM_CLASSROOM_LOAD";
export const EXAM_CLASSROOM_START = "EXAM_CLASSROOM_START";
export const EXAM_CLASSROOM_FINISH = "EXAM_CLASSROOM_FINISH";
export const EXAM_CLASSROOM_STATE = "EXAM_CLASSROOOM_STATE";
export const EXAM_CLASSROOM_EXCERCISE = "EXAM_CLASSROOM_EXCERCISE";
export const EXAM_CLASSROOM_ANSWER = "EXAM_CLASSROOM_ANSWER";
export const EXAM_CLASSROOM_ANSWER_EXAM = "EXAM_CLASSROOM_ANSWER_EXAM";
export const EXAM_CLASSROOM_RESULTS_LOAD = "EXAM_CLASSROOM_RESULTS_LOAD";
export const EXAMS_CLASSROOM_DELETE = "EXAMS_CLASSROOM_DELETE";
export const EXAM_CLASSROOM_CLEAR = "EXAM_CLASSROOM_CLEAR";
export const EXAM_CLASSROOM_EXCERCISE_ID = "EXAM_CLASSROOM_EXCERCISE_ID";
export const EXAM_DELETE = "EXAM_DELETE";
export interface ExamCreate {
  type: typeof EXAM_CREATE;
  payload: Exam;
}

export interface ExamAddExcercise {
  type: typeof EXAM_ADD_EXCERCISE;
  payload: Excercise;
}
export interface ExamDeleteExcercise {
  type: typeof EXAM_DELETE_EXCERCISE;
  payload: Excercise[];
}

export interface ExamsLoad {
  type: typeof EXAMS_LOAD;
  payload: Exam[];
}

export interface ExamExcerciseReset {
  type: typeof EXAM_EXCERCISE_RESET;
  payload: Excercise[];
}

export interface ExamsClassroomLoad {
  type: typeof EXAMS_CLASSROOM_LOAD;
  payload: ExamClassroom[];
}

export interface ExamsClassroomAdd {
  type: typeof EXAMS_CLASSROOM_ADD;
  payload: ExamClassroom;
}

export interface ExamLoad {
  type: typeof EXAM_LOAD;
  payload: Exam;
}

export interface ExamClassroomLoad {
  type: typeof EXAM_CLASSROOM_LOAD;
  payload: ExamClassroom;
}

export interface ExamClassroomStart {
  type: typeof EXAM_CLASSROOM_START;
}

export interface ExamClassroomFinish {
  type: typeof EXAM_CLASSROOM_FINISH;
}

export interface ExamClassroomChangeState {
  type: typeof EXAM_CLASSROOM_STATE;
  payload: ExamClassroom[];
}

export interface ExamClassromChangeExcercise {
  type: typeof EXAM_CLASSROOM_EXCERCISE;
  payload: number;
}

export interface ExamClassroomAnswerExcercise {
  type: typeof EXAM_CLASSROOM_ANSWER;
  payload: AnswerExcercise;
}

export interface ExamClassroomAnswerExam {
  type: typeof EXAM_CLASSROOM_ANSWER_EXAM;
}

export interface ExamClassroomResultsLoad {
  type: typeof EXAM_CLASSROOM_RESULTS_LOAD;
  payload: AnswerExam[];
}

export interface ExamsClassroomDelete {
  type: typeof EXAMS_CLASSROOM_DELETE;
  payload: ExamClassroom[];
}

export interface ExamClassroomClear {
  type: typeof EXAM_CLASSROOM_CLEAR;
}

export interface ExamClassromChangeExcerciseId {
  type: typeof EXAM_CLASSROOM_EXCERCISE_ID;
  payload: string;
}

export interface ExamDelete {
  type: typeof EXAM_DELETE;
  payload: Exam[];
}
export type ExamDispatchTypes =
  | ExamCreate
  | ExamAddExcercise
  | ExamDeleteExcercise
  | ExamsLoad
  | ExamExcerciseReset
  | ExamsClassroomLoad
  | ExamsClassroomAdd
  | ExamLoad
  | ExamClassroomLoad
  | ExamClassroomStart
  | ExamClassroomFinish
  | ExamClassroomChangeState
  | ExamClassromChangeExcercise
  | ExamClassroomAnswerExcercise
  | ExamClassroomAnswerExam
  | ExamClassroomResultsLoad
  | ExamsClassroomDelete
  | ExamClassroomClear
  | ExamClassromChangeExcerciseId
  | ExamDelete;
