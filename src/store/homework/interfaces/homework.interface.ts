import { Excercise } from "../../excercise/interfaces/exercise.interface";

export interface Homework {
  excercises: Excercise[];
  name: string;
  course: string;
  grade: string;
  teacher: string;
}
