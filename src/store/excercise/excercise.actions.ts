import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { ExcerciseDto } from "./dtos/excercise.dto";
import {
  ExcerciseDispatchTypes,
  excercisesUrl,
  EXCERCISE_CREATE,
  EXCERCISE_FLAG,
  EXCERCISE_LOAD,
} from "./excercise.types";

export const loadExcercises = (teacherId: string) => async (
  dispatch: Dispatch<ExcerciseDispatchTypes>
) => {
  try {
    const res = await axios.get(excercisesUrl.concat(`teacher/${teacherId}`));
    dispatch({
      type: EXCERCISE_LOAD,
      payload: res.data.excercises,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const createExcercise = (excerciseDto: ExcerciseDto) => async (
  dispatch: Dispatch<ExcerciseDispatchTypes>
) => {
  try {
    const res = await axios.post(excercisesUrl, excerciseDto);

    if (res.data.excercise) {
      dispatch({
        type: EXCERCISE_CREATE,
        payload: res.data.excercise,
      });
      dispatch({
        type: EXCERCISE_FLAG,
        payload: true,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
    dispatch({
      type: EXCERCISE_FLAG,
      payload: false,
    });
  }
};

export const excerciseFlag = (flag: boolean) => async (
  dispatch: Dispatch<ExcerciseDispatchTypes>
) => {
  dispatch({
    type: EXCERCISE_FLAG,
    payload: flag,
  });
};
