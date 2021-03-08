import { Excercise } from "../../excercise/interfaces/exercise.interface";
import { Homework } from "./homework.interface";

export interface IState {
  homeworks: Homework[];
  newHomeworkExcercises: Excercise[];
}
