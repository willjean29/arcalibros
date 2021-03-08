import { Classroom } from "../../classroom/interfaces/classroom.interface";
import { Exam } from "./exam.interface";

export interface ExamClassroom {
  _id?: string;
  name: string;
  classroom: string | Classroom;
  exam: string | Exam;
  active: boolean;
  startDate: string;
  finishDate: string;
}
