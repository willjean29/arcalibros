import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import {
  ClassroomDispatchTypes,
  classroomsURL,
  CLASSROOMS_STUDENT_UPDATE,
  CLASSROOMS_UPDATE,
  CLASSROOM_ADD_COMMENT,
  CLASSROOM_BAN_STUDENT,
  CLASSROOM_CLOSE_MODAL,
  CLASSROOM_COMMENTS_LOAD,
  CLASSROOM_CREATE,
  CLASSROOM_CREATE_ERROR,
  CLASSROOM_DETAIL,
  CLASSROOM_EDIT,
  CLASSROOM_EVENTS_ADD,
  CLASSROOM_EVENTS_LOAD,
  CLASSROOM_LOAD,
  CLASSROOM_LOAD_BANNED,
  CLASSROOM_UNBAN_STUDENT,
  CLASSROOM_UPDATE,
  eventsURL,
} from "./classroom.types";

import { RootStore } from "./../store";
import { Classroom } from "./interfaces/classroom.interface";
import { ClassroomDto } from "./dtos/classroom.dto";
import { ClassroomComment } from "./interfaces/classroom-comment.interface";
import { ClassroomEditDto } from "./dtos/classroom-edit.dto";
import { toast } from "react-toastify";
import { ClassroomEvent } from "./interfaces/classroom-events.interface";
import { AddClassroomEventDto } from "./dtos/add-classroom-event.dto";
import { BanStudentDto } from "./dtos/ban-student.dto";
import { BannedStudent } from "./interfaces/banned-student.interface";

export const createClassroom = (classroom: ClassroomDto) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>,
  getState: () => RootStore
) => {
  const teacher = getState().user.user?._id;
  const school = getState().user.user?.school._id;
  try {
    const resClassroom = await axios.post(classroomsURL.concat("create"), {
      ...classroom,
      teacher,
      school,
    });

    dispatch({
      type: CLASSROOM_CREATE,
      payload: {
        classroom: resClassroom.data.classroom,
        createClassroomError: undefined,
      },
    });
    dispatch({
      type: CLASSROOM_CLOSE_MODAL,
      payload: true,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    dispatch({
      type: CLASSROOM_CREATE_ERROR,
      payload: errorAxios.response?.data.message,
    });
  }
};

export const classroomEdit = (
  classroomId: string,
  classroomEditDto: ClassroomEditDto
) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    const res = await axios.put(
      classroomsURL.concat(`edit/${classroomId}`),
      classroomEditDto
    );
    if (res.data.classroom) {
      toast.success("Salón editado con éxito");
      dispatch({
        type: CLASSROOM_EDIT,
        payload: res.data.classroom,
      });
    }
  } catch (error) {
    toast.error("Error al editar salón");
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const loadClassroomDetail = (classroomId: string) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>
) => {
  try {
    const res = await axios.get(classroomsURL.concat(classroomId));
    dispatch({
      type: CLASSROOM_DETAIL,
      payload: res.data.classroom,
    });
    dispatch({
      type: CLASSROOM_COMMENTS_LOAD,
      payload: res.data.classroom.comments,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const loadClassrooms = () => async (
  dispatch: Dispatch<ClassroomDispatchTypes>,
  getState: () => RootStore
) => {
  const classrooms = getState().user.user?.classrooms as Classroom[];
  dispatch({
    type: CLASSROOM_LOAD,
    payload: classrooms,
  });
};

export const updateClassroom = (newClassroom: Classroom) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>,
  getState: () => RootStore
) => {
  const selectedClassroom = getState().classroom.selectedClassroom;
  const classrooms = getState().classroom.classrooms;
  if (selectedClassroom && newClassroom._id === selectedClassroom._id) {
    dispatch({
      type: CLASSROOM_UPDATE,
      payload: newClassroom,
    });
    const updatedClassrooms = classrooms.map((classroom) =>
      classroom._id === newClassroom._id ? newClassroom : classroom
    );
    dispatch({
      type: CLASSROOMS_UPDATE,
      payload: updatedClassrooms,
    });
  } else {
    const updatedClassrooms = classrooms.map((classroom) =>
      classroom._id === newClassroom._id ? newClassroom : classroom
    );
    dispatch({
      type: CLASSROOMS_UPDATE,
      payload: updatedClassrooms,
    });
  }
};

export const classroomStudentUpdate = (newClassroom: Classroom) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>,
  getState: () => RootStore
) => {
  const classrooms = getState().classroom.classrooms;
  const findRepeated = (classroom: Classroom) => {
    return classroom._id === newClassroom._id;
  };
  const updatedClassrooms = classrooms.find(findRepeated)
    ? classrooms
    : [...classrooms, newClassroom];

  dispatch({
    type: CLASSROOMS_STUDENT_UPDATE,
    payload: updatedClassrooms as Classroom[],
  });
};

export const addClassroomComment = (
  comment: ClassroomComment,
  classroomId: string
) => async (dispatch: Dispatch<ClassroomDispatchTypes>) => {
  try {
    const res = await axios.post(
      classroomsURL.concat(`addcomment/${classroomId}`),
      comment
    );

    dispatch({
      type: CLASSROOM_ADD_COMMENT,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const deleteClassroomComment = (
  comment: ClassroomComment,
  classroomId: string
) => async (dispatch: Dispatch<ClassroomDispatchTypes>) => {
  try {
    const res = await axios.post(
      classroomsURL.concat(`removecomment/${classroomId}`),
      comment
    );
    dispatch({
      type: CLASSROOM_ADD_COMMENT,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const loadClassroomEvents = (selectedClassroom: string) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>
) => {
  try {
    const res1 = await axios.get(
      eventsURL.concat(`birthdays/${selectedClassroom}`)
    );
    const res2 = await axios.get(eventsURL.concat(`${selectedClassroom}`));

    if (res1.data.events && res2.data.events) {
      dispatch({
        type: CLASSROOM_EVENTS_LOAD,
        payload: [...res1.data.events, ...res2.data.events],
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const addClassroomEvent = (
  classroomEvent: AddClassroomEventDto
) => async (dispatch: Dispatch<ClassroomDispatchTypes>) => {
  try {
    const res = await axios.post(eventsURL.concat(`new`), classroomEvent);

    if (res.data.event) {
      dispatch({
        type: CLASSROOM_EVENTS_ADD,
        payload: res.data.event,
      });
      toast.success("Evento agregado con éxito");
    }
  } catch (error) {
    toast.error("Error al agregar evento");
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const loadBannedStudents = (classroomId: string) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>
) => {
  try {
    const res = await axios.get(classroomsURL.concat(`ban/${classroomId}`));

    if (res.data.bannedStudents) {
      dispatch({
        type: CLASSROOM_LOAD_BANNED,
        payload: res.data.bannedStudents,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const banStudent = (banStudentDto: BanStudentDto) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>,
  getState: () => RootStore
) => {
  const bannedStudents = getState().classroom
    .selectedClassroomBannedStudents as BannedStudent[];

  try {
    const res = await axios.post(classroomsURL.concat(`ban`), banStudentDto);

    if (res.data.bannedStudent) {
      if (
        bannedStudents.find(
          (bannedStudent) =>
            bannedStudent.classroom === banStudentDto.classroom &&
            bannedStudent.student === banStudentDto.student
        ) === undefined
      ) {
        dispatch({
          type: CLASSROOM_BAN_STUDENT,
          payload: [...bannedStudents, res.data.bannedStudent],
        });
      } else {
        const newBannedStudents = bannedStudents.map((bannedStudent) =>
          bannedStudent._id !== res.data.bannedStudent._id
            ? bannedStudent
            : res.data.bannedStudent
        );
        dispatch({
          type: CLASSROOM_BAN_STUDENT,
          payload: newBannedStudents,
        });
      }

      toast.success("Alumno suspendido con éxito");
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
    toast.error("Error al suspender al alumno");
  }
};

export const unbanStudent = (banStudentDto: BanStudentDto) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>,
  getState: () => RootStore
) => {
  const bannedStudents = getState().classroom
    .selectedClassroomBannedStudents as BannedStudent[];
  try {
    const res = await axios.post(classroomsURL.concat(`unban`), banStudentDto);

    if (res.data.unbannedStudent) {
      const newBannedStudents = bannedStudents.map((bannedStudent) =>
        bannedStudent._id !== res.data.unbannedStudent._id
          ? bannedStudent
          : res.data.unbannedStudent
      );

      dispatch({
        type: CLASSROOM_UNBAN_STUDENT,
        payload: newBannedStudents,
      });
      toast.success("Suspensión eliminada con éxito");
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
    toast.error("Error al quitar suspensión al alumno");
  }
};

export const updateBannedStudent = (bannedStudent: BannedStudent) => async (
  dispatch: Dispatch<ClassroomDispatchTypes>,
  getState: () => RootStore
) => {
  const bannedStudents = getState().classroom
    .selectedClassroomBannedStudents as BannedStudent[];

  if (
    bannedStudents.find(
      (bannedStudent) =>
        bannedStudent.classroom === bannedStudent.classroom &&
        bannedStudent.student === bannedStudent.student
    ) === undefined
  ) {
    dispatch({
      type: CLASSROOM_BAN_STUDENT,
      payload: [...bannedStudents, bannedStudent],
    });
  } else {
    const newBannedStudents = bannedStudents.map((banned) =>
      banned._id !== banned._id ? banned : bannedStudent
    );
    dispatch({
      type: CLASSROOM_BAN_STUDENT,
      payload: newBannedStudents,
    });
  }
};
