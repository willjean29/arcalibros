import { Student } from "../../user/interfaces/student.interface";
import { AnswerExcercise } from "./answer-excercise.interface";
import { ExamClassroom } from "./exam-classroom.interface";

export interface AnswerExam {
  student: Student | string;
  examClassroom: string | ExamClassroom;
  answers: AnswerExcercise[];
  correct: number;
  incorrect: number;
}
