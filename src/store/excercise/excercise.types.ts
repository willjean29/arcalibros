import { Excercise } from "./interfaces/exercise.interface";

export const EXCERCISE_CREATE = "EXCERCISE_CREATE";
export const EXCERCISE_LOAD = "EXCERCISE_LOAD";
export const EXCERCISE_FLAG = "EXCERCISE_FLAG";

export const excercisesUrl = "http://localhost:4000/excercises/";

export interface ExcerciseCreate {
  type: typeof EXCERCISE_CREATE;
  payload: Excercise;
}

export interface ExcerciseLoad {
  type: typeof EXCERCISE_LOAD;
  payload: Excercise[];
}

export interface ExcerciseFlag {
  type: typeof EXCERCISE_FLAG;
  payload: boolean;
}

export type ExcerciseDispatchTypes =
  | ExcerciseCreate
  | ExcerciseLoad
  | ExcerciseFlag;
