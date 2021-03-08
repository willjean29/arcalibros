import { IState } from "./interfaces/user-state.interface";
import {
  STUDENT_LOGIN,
  STUDENT_REGISTER,
  STUDENT_REGISTER_ERROR,
  TEACHER_LOGIN,
  TEACHER_REGISTER,
  TEACHER_REGISTER_ERROR,
  UserDispatchTypes,
  USERS_CONNECTED,
  USER_CHANGE_PROFILE,
  USER_CHANGE_SCHOOL,
  USER_LOAD_PROFILE,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_REGISTER_DONE,
} from "./user.types";

const defaultState: IState = {
  user: null,
  profileImg: "default",
  userRegisterDone: false,
  connectedUsers: [] as string[],
};

export const userReducer = (
  state: IState = defaultState,
  action: UserDispatchTypes
): IState => {
  switch (action.type) {
    case TEACHER_LOGIN:
      return { ...state, user: action.payload, loginError: undefined };
    case STUDENT_LOGIN:
      return { ...state, user: action.payload, loginError: undefined };
    case USER_LOGIN_ERROR:
      return { ...state, loginError: action.payload };
    case USER_LOGOUT:
      return { ...defaultState };
    case TEACHER_REGISTER_ERROR:
      return { ...state, registerTeacherErrors: action.payload };
    case STUDENT_REGISTER_ERROR:
      return { ...state, registerStudentErrors: action.payload };
    case TEACHER_REGISTER:
      return {
        ...state,
        registerStudentErrors: action.payload.registerTeacherErrors,
      };
    case STUDENT_REGISTER:
      return {
        ...state,
        registerStudentErrors: action.payload.registerStudentErrors,
      };
    case USER_LOAD_PROFILE:
      return { ...state, profileImg: action.payload };
    case USER_REGISTER_DONE:
      return { ...state, userRegisterDone: action.payload };
    case USER_CHANGE_PROFILE:
      return { ...state, profileImg: action.payload };
    case USERS_CONNECTED:
      return { ...state, connectedUsers: action.payload };
    case USER_CHANGE_SCHOOL:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
