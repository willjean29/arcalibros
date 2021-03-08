import { Topic } from "../../topic/interfaces/topic.interface";
import { School } from "../../user/interfaces/school.interface";
import { Student } from "../../user/interfaces/student.interface";
import { Teacher } from "../../user/interfaces/teacher.interface";
import { ClassroomComment } from "./classroom-comment.interface";

export interface Classroom {
  _id?: string;
  students: Student[];
  topics: Topic[];
  teacher: Teacher;
  comments: ClassroomComment[];
  color: string;
  course: string;
  grade: string;
  section: string;
  level: string;
  school: School;
  insignia: string;
}
