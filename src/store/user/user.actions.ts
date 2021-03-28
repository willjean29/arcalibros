import { UserType } from "./../../utils/enums";
import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";

import {
  UserDispatchTypes,
  usersURL,
  STUDENT_LOGIN,
  TEACHER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  TEACHER_REGISTER_ERROR,
  TEACHER_REGISTER,
  STUDENT_REGISTER,
  STUDENT_REGISTER_ERROR,
  USER_LOAD_PROFILE,
  USER_REGISTER_DONE,
  USER_CHANGE_PROFILE,
  USER_CHANGE_SCHOOL,
} from "./user.types";

import { LoginDto } from "./dtos/login-dto.interface";

import { RootStore } from "../store";

import { TeacherRegisterDto } from "./dtos/register-teacher.dto";
import { StudentRegisterDto } from "./dtos/register-student.dto";
import { Teacher } from "./interfaces/teacher.interface";
import { Student } from "./interfaces/student.interface";

export const loginUser = (loginDto: LoginDto) => async (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  try {
    const res = await axios.post(usersURL.concat("login"), loginDto);
    switch (res.data.user.type) {
      case UserType.TEACHER:
        dispatch({
          type: TEACHER_LOGIN,
          payload: res.data.user,
        });

        break;

      case UserType.STUDENT:
        dispatch({
          type: STUDENT_LOGIN,
          payload: res.data.user,
        });
        break;
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: errorAxios.response?.data.message,
    });
  }
};

export const userLogout = () => async (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.clear();
};

export const registerTeacher = (teacherDto: TeacherRegisterDto) => async (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  try {
    const res = await axios.post(
      usersURL.concat("register/teacher"),
      teacherDto
    );
    dispatch({
      type: TEACHER_REGISTER,
      payload: { registerTeacherErrors: undefined, user: res.data.user },
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    dispatch({
      type: TEACHER_REGISTER_ERROR,
      payload: errorAxios.response?.data.message,
    });
  }
};

export const registerStudent = (studentDto: StudentRegisterDto) => async (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  try {
    const res = await axios.post(
      usersURL.concat("register/student"),
      studentDto
    );
    dispatch({
      type: STUDENT_REGISTER,
      payload: { registerStudentErrors: undefined, user: res.data.user },
    });
    dispatch({
      type: STUDENT_REGISTER_ERROR,
      payload: [],
    });
    dispatch({
      type: USER_REGISTER_DONE,
      payload: true,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    dispatch({
      type: STUDENT_REGISTER_ERROR,
      payload: errorAxios.response?.data.message,
    });
    dispatch({
      type: USER_REGISTER_DONE,
      payload: false,
    });
  }
};

export const loadProfileImage = (profileId: string) => async (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  try {
    const res = await axios.get(usersURL.concat(`profile/${profileId}`));

    dispatch({
      type: USER_LOAD_PROFILE,
      payload: `https://meet.arcavirtual.net/users/profile/${profileId}`,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_PROFILE,
      payload: "default",
    });
  }
};

export const updateProfileImage = (profileImg: any) => async (
  dispatch: Dispatch<UserDispatchTypes>,
  getState: () => RootStore
) => {
  const profileId = getState().user.user?._id as string;

  const formData = new FormData();
  formData.append("profileImg", profileImg);
  try {
    const res = await axios.post(
      usersURL.concat(`profile/${profileId}`),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.profileImg) {
      dispatch({
        type: USER_CHANGE_PROFILE,
        payload: `https://meet.arcavirtual.net/users/profile/${profileId}`,
      });
      document.location.reload();
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.message);
  }
};

export const changeSchool = (user: Teacher | Student) => async (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  dispatch({
    type: USER_CHANGE_SCHOOL,
    payload: user,
  });
};
