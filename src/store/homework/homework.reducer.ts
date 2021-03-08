import { Excercise } from "../excercise/interfaces/exercise.interface";
import {
  HomeworkDispatchTypes,
  HOMEWORKS_LOAD,
  HOMEWORK_ADD_EXCERCISE,
  HOMEWORK_CREATE,
  HOMEWORK_DELETE_EXCERCISE,
  HOMEWORK_EXCERCISE_RESET,
} from "./homework.types";
import { IState } from "./interfaces/homework-state.interface";
import { Homework } from "./interfaces/homework.interface";

const defaultState: IState = {
  homeworks: [] as Homework[],
  newHomeworkExcercises: [] as Excercise[],
};
export const homeworkReducer = (
  state: IState = defaultState,
  action: HomeworkDispatchTypes
) => {
  switch (action.type) {
    case HOMEWORK_CREATE:
      return { ...state, homeworks: [...state.homeworks, action.payload] };
    case HOMEWORK_ADD_EXCERCISE:
      return {
        ...state,
        newHomeworkExcercises: [...state.newHomeworkExcercises, action.payload],
      };
    case HOMEWORK_DELETE_EXCERCISE:
      return {
        ...state,
        newHomeworkExcercises: action.payload,
      };
    case HOMEWORKS_LOAD:
      return { ...state, homeworks: action.payload };
    case HOMEWORK_EXCERCISE_RESET:
      return { ...state, newHomeworkExcercises: action.payload };
    default:
      return state;
  }
};
