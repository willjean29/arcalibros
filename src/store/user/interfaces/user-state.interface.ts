import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";
import { User } from "./user.interface";

type UserType = User | Teacher | Student | null;
export interface IState {
  user: UserType;
  loginError?: string[];
  registerTeacherErrors?: string[] | string;
  registerStudentErrors?: string[] | string;
  profileImg: string;
  userRegisterDone: boolean;
  connectedUsers: string[];
}
