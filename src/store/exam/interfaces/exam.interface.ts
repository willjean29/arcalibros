import { Excercise } from "../../excercise/interfaces/exercise.interface";

export interface Exam {
  _id?: string;
  excercises: Excercise[];
  name: string;
  course: string;
  grade: string;
  level: string;
  teacher: string;
}
