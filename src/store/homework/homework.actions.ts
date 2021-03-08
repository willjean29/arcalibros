import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";

import { Excercise } from "../excercise/interfaces/exercise.interface";
import { RootStore } from "../store";
import {
  HomeworkDispatchTypes,
  HOMEWORKS_LOAD,
  homeworkURL,
  HOMEWORK_ADD_EXCERCISE,
  HOMEWORK_DELETE_EXCERCISE,
  HOMEWORK_EXCERCISE_RESET,
} from "./homework.types";
import { Homework } from "./interfaces/homework.interface";

export const homeworkAddExcercise = (excercise: Excercise) => (
  dispatch: Dispatch<HomeworkDispatchTypes>
) => {
  dispatch({
    type: HOMEWORK_ADD_EXCERCISE,
    payload: excercise,
  });
};

export const homeworkDeleteExcercise = (excercise: Excercise) => (
  dispatch: Dispatch<HomeworkDispatchTypes>,
  getState: () => RootStore
) => {
  const newHomeworkExcercises = getState().homework.newHomeworkExcercises;
  const filterHomeworkExcercises = newHomeworkExcercises.filter(
    (excerciseHomework) => excercise._id !== excerciseHomework._id
  );
  dispatch({
    type: HOMEWORK_DELETE_EXCERCISE,
    payload: filterHomeworkExcercises,
  });
};

export const createHomework = (homework: Homework) => (
  dispatch: Dispatch<HomeworkDispatchTypes>,
  getState: () => RootStore
) => {
  try {
  } catch (error) {}
};

export const loadHomeworks = (teacherId: string) => async (
  dispatch: Dispatch<HomeworkDispatchTypes>
) => {
  try {
    const res = await axios.get(homeworkURL.concat(teacherId));
    console.log(res.data);
    if (res.data.homeworks) {
      dispatch({
        type: HOMEWORKS_LOAD,
        payload: res.data.homeworks,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const homeworkResetExcercises = () => (
  dispatch: Dispatch<HomeworkDispatchTypes>
) => {
  dispatch({
    type: HOMEWORK_EXCERCISE_RESET,
    payload: [] as Excercise[],
  });
};
