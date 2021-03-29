import { BannedStudent } from "./interfaces/banned-student.interface";
import { ClassroomComment } from "./interfaces/classroom-comment.interface";
import { ClassroomEvent } from "./interfaces/classroom-events.interface";
import { Classroom } from "./interfaces/classroom.interface";

export const classroomsURL = "http://localhost:4000/classrooms/";
export const eventsURL = "http://localhost:4000/events/";

export const CLASSROOM_SELECT = "CLASSROOM_SELECT";
export const CLASSROOM_SUSCRIBE = "CLASSROOM_SUSCRIBE";
export const CLASSROOM_CREATE = "CLASSROOM_CREATE";
export const CLASSROOM_CREATE_ERROR = "CLASSROOM_CREATE_ERROR";
export const CLASSROOM_LOAD = "CLASSROOM_LOAD";
export const CLASSROOM_DETAIL = "CLASSROOM_DETAIL";
export const CLASSROOM_CLOSE_MODAL = "CLASSROOM_CLOSE_MODAL";
export const CLASSROOM_UPDATE = "CLASSROOM_UPDATE";
export const CLASSROOMS_UPDATE = "CLASSROOMS_UPDATE";
export const CLASSROOMS_STUDENT_UPDATE = "CLASSROOMS_STUDENT_UPDATE";
export const CLASSROOM_COMMENTS_LOAD = "CLASSROOM_COMMENTS_LOAD";
export const CLASSROOM_ADD_COMMENT = "CLASSROOM_ADD_COMMENT";
export const CLASSROOM_DELETE_COMMENT = "CLASSROOM_DELETE_COMMENT";
export const CLASSROOM_EDIT = "CLASSROOM_EDIT";
export const CLASSROOM_EVENTS_LOAD = "CLASSROOM_EVENTS_LOAD";
export const CLASSROOM_EVENTS_ADD = "CLASSROOM_EVENTS_ADD";
export const CLASSROOM_BAN_STUDENT = "CLASSROOM_BAN_STUDENT";
export const CLASSROOM_UNBAN_STUDENT = "CLASSROOM_UNBAN_STUDENT";
export const CLASSROOM_LOAD_BANNED = "CLASSROOM_LOAD_BANNED";

export interface ClassroomSelect {
  type: typeof CLASSROOM_SELECT;
  payload: Classroom;
}

export interface ClassroomCreate {
  type: typeof CLASSROOM_CREATE;
  payload: { createClassroomError: undefined; classroom: Classroom };
}
export interface ClassroomCreateError {
  type: typeof CLASSROOM_CREATE_ERROR;
  payload: string[] | undefined;
}
export interface ClassroomLoad {
  type: typeof CLASSROOM_LOAD;
  payload: Classroom[];
}

export interface ClassroomDetail {
  type: typeof CLASSROOM_DETAIL;
  payload: Classroom;
}
export interface CloseCreateClassroomModal {
  type: typeof CLASSROOM_CLOSE_MODAL;
  payload: boolean;
}

export interface ClassroomUpdate {
  type: typeof CLASSROOM_UPDATE;
  payload: Classroom;
}
export interface ClassroomsUpdate {
  type: typeof CLASSROOMS_UPDATE;
  payload: Classroom[];
}
export interface ClassroomEdit {
  type: typeof CLASSROOM_EDIT;
  payload: Classroom;
}
export interface ClassroomStudentUpdate {
  type: typeof CLASSROOMS_STUDENT_UPDATE;
  payload: Classroom[];
}
export interface ClassroomLoadComments {
  type: typeof CLASSROOM_COMMENTS_LOAD;
  payload: ClassroomComment[];
}
export interface ClassroomAddComment {
  type: typeof CLASSROOM_ADD_COMMENT;
}

export interface ClassroomEventsLoad {
  type: typeof CLASSROOM_EVENTS_LOAD;
  payload: ClassroomEvent[];
}

export interface ClassroomEventsAdd {
  type: typeof CLASSROOM_EVENTS_ADD;
  payload: ClassroomEvent;
}

export interface ClassroomLoadBannedStudents {
  type: typeof CLASSROOM_LOAD_BANNED;
  payload: BannedStudent[];
}

export interface ClassroomBanStudent {
  type: typeof CLASSROOM_BAN_STUDENT;
  payload: BannedStudent[];
}

export interface ClassroomUnbanStudent {
  type: typeof CLASSROOM_UNBAN_STUDENT;
  payload: BannedStudent[];
}

export type ClassroomDispatchTypes =
  | ClassroomSelect
  | ClassroomCreate
  | ClassroomCreateError
  | ClassroomLoad
  | ClassroomDetail
  | CloseCreateClassroomModal
  | ClassroomUpdate
  | ClassroomsUpdate
  | ClassroomStudentUpdate
  | ClassroomLoadComments
  | ClassroomAddComment
  | ClassroomEdit
  | ClassroomEventsLoad
  | ClassroomEventsAdd
  | ClassroomLoadBannedStudents
  | ClassroomBanStudent
  | ClassroomUnbanStudent;
