import { Dispatch } from "redux";
import { RootStore } from "../store";
import {
  UiDispatchTypes,
  NAVBAR_DROPDOWN_OPEN,
  EXCERCISE_SELECT_ITEM,
  MESSAGES_SELECT_ITEM,
  MENU_EXCERCISE_SELECT,
  MENU_CLASSROOM_SELECT,
  CLOCK_SET,
  SELECT_CLASSROOM,
} from "./ui.types";

export const openNavbarDropdown = (value: boolean) => (
  dispatch: Dispatch<UiDispatchTypes>
) => {
  dispatch({
    type: NAVBAR_DROPDOWN_OPEN,
    payload: value,
  });
};

export const excerciseSelectionItem = (selection: number) => (
  dispatch: Dispatch<UiDispatchTypes>
) => {
  dispatch({
    type: EXCERCISE_SELECT_ITEM,
    payload: selection,
  });
};

export const messagesSelectionItem = (selection: string) => (
  dispatch: Dispatch<UiDispatchTypes>
) => {
  dispatch({
    type: MESSAGES_SELECT_ITEM,
    payload: selection,
  });
};

export const menuExcerciseSelectionItem = (selection: number) => (
  dispatch: Dispatch<UiDispatchTypes>
) => {
  dispatch({
    type: MENU_EXCERCISE_SELECT,
    payload: selection,
  });
};

export const menuClassroomSelectionItem = (selection: number) => (
  dispatch: Dispatch<UiDispatchTypes>
) => {
  dispatch({
    type: MENU_CLASSROOM_SELECT,
    payload: selection,
  });
};

export const setClock = (clock: string) => (
  dispatch: Dispatch<UiDispatchTypes>
) => {
  dispatch({
    type: CLOCK_SET,
    payload: clock,
  });
};

export const selectClassroom = (classroom: string) => (
  dispatch: Dispatch<UiDispatchTypes>
) => {
  dispatch({
    type: SELECT_CLASSROOM,
    payload: classroom,
  });
};
