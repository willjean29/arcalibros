import { Excercise } from "../excercise/interfaces/exercise.interface";
import { Homework } from "./interfaces/homework.interface";

export const homeworkURL = "https://meet.arcavirtual.net/evaluations/homework/";
export const HOMEWORK_CREATE = "HOMEWORK_CREATE";
export const HOMEWORK_ADD_EXCERCISE = "HOMEWORK_ADD_EXCERCISE";
export const HOMEWORK_DELETE_EXCERCISE = "HOMEWORK_DELETE_EXCERCISE";
export const HOMEWORKS_LOAD = "HOMEWORKS_LOAD";
export const HOMEWORK_EXCERCISE_RESET = "HOMEWORK_EXCERCISE_RESET";

export interface HomeworkCreate {
  type: typeof HOMEWORK_CREATE;
  payload: Homework;
}
export interface HomeworkAddExcercise {
  type: typeof HOMEWORK_ADD_EXCERCISE;
  payload: Excercise;
}
export interface HomeworkDeleteExcercise {
  type: typeof HOMEWORK_DELETE_EXCERCISE;
  payload: Excercise[];
}

export interface HomeworksLoad {
  type: typeof HOMEWORKS_LOAD;
  payload: Homework[];
}

export interface HomeworkExcerciseReset {
  type: typeof HOMEWORK_EXCERCISE_RESET;
  payload: Excercise[];
}
export type HomeworkDispatchTypes =
  | HomeworkCreate
  | HomeworkAddExcercise
  | HomeworkDeleteExcercise
  | HomeworksLoad
  | HomeworkExcerciseReset;
