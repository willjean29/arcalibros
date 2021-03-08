import { IState } from "./interfaces/ui-state.interface";
import {
  UiDispatchTypes,
  NAVBAR_DROPDOWN_OPEN,
  SIDEBAR_SELECT_ITEM,
  EXCERCISE_SELECT_ITEM,
  MESSAGES_SELECT_ITEM,
  MENU_EXCERCISE_SELECT,
  MENU_CLASSROOM_SELECT,
  MENU_EVALUATION_SELECT,
  CLOCK_SET,
  SELECT_CLASSROOM,
} from "./ui.types";
import { MessageItem, SidebarItem } from "../../utils/enums";

const defaultState: IState = {
  navbarDropdownOpen: false,
  sidebarSelectedItem: SidebarItem.Home,
  excerciseSelectedItem: null,
  menuExcerciseSelectedItem: null,
  menuEvaluationSelectedItem: null,
  menuClassroomSelectedItem: 1,
  messagesSelectedItem: MessageItem.Received,
  clock: "",
  selectedClassroom: null,
};

export const uiReducer = (
  state: IState = defaultState,
  action: UiDispatchTypes
): IState => {
  switch (action.type) {
    case NAVBAR_DROPDOWN_OPEN:
      return { ...state, navbarDropdownOpen: action.payload };
    case SIDEBAR_SELECT_ITEM:
      return { ...state, sidebarSelectedItem: action.payload };
    case EXCERCISE_SELECT_ITEM:
      return { ...state, excerciseSelectedItem: action.payload };
    case MESSAGES_SELECT_ITEM:
      return { ...state, messagesSelectedItem: action.payload };
    case MENU_EXCERCISE_SELECT:
      return { ...state, menuExcerciseSelectedItem: action.payload };
    case MENU_CLASSROOM_SELECT:
      return { ...state, menuClassroomSelectedItem: action.payload };
    case MENU_EVALUATION_SELECT:
      return { ...state, menuEvaluationSelectedItem: action.payload };
    case CLOCK_SET:
      return { ...state, clock: action.payload };
    case SELECT_CLASSROOM:
      return { ...state, selectedClassroom: action.payload };
    default:
      return state;
  }
};
