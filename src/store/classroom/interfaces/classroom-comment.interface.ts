import { Student } from "../../user/interfaces/student.interface";
import { Teacher } from "../../user/interfaces/teacher.interface";

export interface ClassroomComment {
  _id?: string;
  author: Teacher | Student | string;
  name: string;
  type: number;
  comment: string;
  date: string;
  profileImg: string;
  file?: string;
  link?: string;
}
