import { Excercise } from "../../excercise/interfaces/exercise.interface";
import { ExamClassroom } from "./exam-classroom.interface";
import { Exam } from "./exam.interface";
import { AnswerExcercise } from "./answer-excercise.interface";
import { AnswerExam } from "./answer-exam.interface";

export interface IState {
  exams: Exam[];
  newExamExcercises: Excercise[];
  examsClassroom: ExamClassroom[];
  actualExam: Exam | null;
  actualExamClassroom: ExamClassroom | null;
  actualExamExcercise: number;
  actualExamExcerciseId: string;
  actualExamAnswers: AnswerExcercise[];
  actualExamResults: AnswerExam[];
}
