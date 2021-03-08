export const NAVBAR_DROPDOWN_OPEN = "NAVBAR_DROPDOWN_OPEN";
export const SIDEBAR_SELECT_ITEM = "SIDEBAR_SELECT_ITEM";
export const EXCERCISE_SELECT_ITEM = "EXCERCISE_SELECT_ITEM";
export const MESSAGES_SELECT_ITEM = "MESSAGES_SELECT_ITEM";
export const MENU_EXCERCISE_SELECT = "MENU_EXCERCISE_SELECT";
export const MENU_EVALUATION_SELECT = "MENU_EVALUATION_SELECT";
export const MENU_CLASSROOM_SELECT = "MENU_CLASSROOM_SELECT";
export const SIDEBAR_SELECT_CLASSROOM = "SIDEBAR_SELECT_CLASSROOM";
export const CLOCK_SET = "CLOCK_SET";
export const SELECT_CLASSROOM = "SELECT_CLASSROOM";

export interface NavbarDropdown {
  type: typeof NAVBAR_DROPDOWN_OPEN;
  payload: boolean;
}

export interface SidebarSelectedItem {
  type: typeof SIDEBAR_SELECT_ITEM;
  payload: string;
}

export interface ExcerciseSelectedItem {
  type: typeof EXCERCISE_SELECT_ITEM;
  payload: number | null;
}

export interface MessagesSelectedItem {
  type: typeof MESSAGES_SELECT_ITEM;
  payload: string;
}
export interface MenuExcerciseSelectedItem {
  type: typeof MENU_EXCERCISE_SELECT;
  payload: number | null;
}

export interface MenuEvaluationSelectedItem {
  type: typeof MENU_EVALUATION_SELECT;
  payload: number | null;
}

export interface MenuClassroomSelectedItem {
  type: typeof MENU_CLASSROOM_SELECT;
  payload: number | null;
}

export interface ClockSet {
  type: typeof CLOCK_SET;
  payload: string;
}

export interface SelectClassroom {
  type: typeof SELECT_CLASSROOM;
  payload: string | null;
}

export type UiDispatchTypes =
  | NavbarDropdown
  | SidebarSelectedItem
  | ExcerciseSelectedItem
  | MessagesSelectedItem
  | MenuExcerciseSelectedItem
  | MenuEvaluationSelectedItem
  | MenuClassroomSelectedItem
  | ClockSet
  | SelectClassroom;
