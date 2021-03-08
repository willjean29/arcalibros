import { Classroom } from "../classroom/interfaces/classroom.interface";
import { Student } from "./interfaces/student.interface";
import { Teacher } from "./interfaces/teacher.interface";
import { User } from "./interfaces/user.interface";

export const usersURL = "http://localhost:4000/users/";
// export const usersURL = "https://meet.arcavirtual.net/users/";


export const TEACHER_LOGIN = "TEACHER_LOGIN";
export const STUDENT_LOGIN = "STUDENT_LOGIN";
export const TEACHER_REGISTER = "TEACHER_REGISTER";
export const STUDENT_REGISTER = "STUDENT_REGISTER";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";
export const TEACHER_REGISTER_ERROR = "TEACHER_REGISTER_ERROR";
export const STUDENT_REGISTER_ERROR = "STUDENT_REGISTER_ERROR";
export const USER_LOAD_PROFILE = "USER_LOAD_PROFILE";
export const USER_REGISTER_DONE = "USER_REGISTER_DONE";
export const USER_CHANGE_PROFILE = "USER_CHANGE_PROFILE";
export const UPDATE_USER = "UPDATE_USER";
export const USERS_CONNECTED = "USERS_CONNECTED";
export const USER_CHANGE_SCHOOL = "USER_CHANGE_SCHOOL";

export interface TeacherLogin {
  type: typeof TEACHER_LOGIN;
  payload: Teacher;
}
export interface StudentLogin {
  type: typeof STUDENT_LOGIN;
  payload: Student;
}
export interface UserLoginError {
  type: typeof USER_LOGIN_ERROR;
  payload: string[];
}

export interface UserLogout {
  type: typeof USER_LOGOUT;
}

export interface TeacherRegister {
  type: typeof TEACHER_REGISTER;
  payload: { registerTeacherErrors: undefined };
}
export interface StudentRegister {
  type: typeof STUDENT_REGISTER;
  payload: { registerStudentErrors: undefined };
}
export interface TeacherRegisterError {
  type: typeof TEACHER_REGISTER_ERROR;
  payload: string[];
}
export interface StudentRegisterError {
  type: typeof STUDENT_REGISTER_ERROR;
  payload: string[];
}

export interface LoadProfileImage {
  type: typeof USER_LOAD_PROFILE;
  payload: string;
}

export interface ChangeProfileImage {
  type: typeof USER_CHANGE_PROFILE;
  payload: string;
}

export interface RegisterDone {
  type: typeof USER_REGISTER_DONE;
  payload: boolean;
}

export interface UpdateUser {
  type: typeof UPDATE_USER;
  payload: Teacher | Student;
}

export interface UsersConnected {
  type: typeof USERS_CONNECTED;
  payload: string[];
}

export interface UserChangeSchool {
  type: typeof USER_CHANGE_SCHOOL;
  payload: Teacher | Student;
}

export type UserDispatchTypes =
  | TeacherLogin
  | UserLoginError
  | StudentLogin
  | UserLogout
  | TeacherRegister
  | StudentRegister
  | TeacherRegisterError
  | StudentRegisterError
  | LoadProfileImage
  | ChangeProfileImage
  | RegisterDone
  | UpdateUser
  | UsersConnected
  | UserChangeSchool;
