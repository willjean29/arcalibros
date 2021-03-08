import { Classroom } from "../../classroom/interfaces/classroom.interface";
import { School } from "./school.interface";

export interface Teacher {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  type: number;
  classrooms: Classroom[];
  school: School;
  dni: string;
  levels: string[];
  registerCode: string;
  profileImg?: string;
  birthday?: string;
}
