import { IState } from "./interfaces/classroom-state.interface";
import {
  ClassroomDispatchTypes,
  CLASSROOMS_STUDENT_UPDATE,
  CLASSROOMS_UPDATE,
  CLASSROOM_ADD_COMMENT,
  CLASSROOM_BAN_STUDENT,
  CLASSROOM_CLOSE_MODAL,
  CLASSROOM_COMMENTS_LOAD,
  CLASSROOM_CREATE,
  CLASSROOM_CREATE_ERROR,
  CLASSROOM_DETAIL,
  CLASSROOM_EVENTS_ADD,
  CLASSROOM_EVENTS_LOAD,
  CLASSROOM_LOAD,
  CLASSROOM_LOAD_BANNED,
  CLASSROOM_SELECT,
  CLASSROOM_SUSCRIBE,
  CLASSROOM_UNBAN_STUDENT,
  CLASSROOM_UPDATE,
} from "./classroom.types";
import { Classroom } from "./interfaces/classroom.interface";
import { ClassroomEvent } from "./interfaces/classroom-events.interface";

const defaultState: IState = {
  classrooms: [],
  closeClassroomModal: false,
};

export const classroomReducer = (
  state: IState = defaultState,
  action: ClassroomDispatchTypes
): IState => {
  switch (action.type) {
    case CLASSROOM_SELECT:
      return { ...state, selectedClassroom: action.payload };
    case CLASSROOM_CREATE:
      return {
        ...state,
        classrooms: [...state.classrooms, action.payload.classroom],
        createClassroomError: action.payload.createClassroomError,
      };
    case CLASSROOM_CREATE_ERROR:
      return { ...state, createClassroomError: action.payload };
    case CLASSROOM_LOAD:
      return { ...state, classrooms: action.payload as Classroom[] };
    case CLASSROOM_DETAIL:
      return { ...state, selectedClassroom: action.payload };
    case CLASSROOM_CLOSE_MODAL:
      return { ...state, closeClassroomModal: action.payload };
    case CLASSROOM_UPDATE:
      return { ...state, selectedClassroom: action.payload };
    case CLASSROOMS_UPDATE:
      return { ...state, classrooms: action.payload };
    case CLASSROOMS_STUDENT_UPDATE:
      return { ...state, classrooms: action.payload };
    case CLASSROOM_COMMENTS_LOAD:
      return { ...state, selectedClassroomComments: action.payload };
    case CLASSROOM_ADD_COMMENT:
      return { ...state };
    case CLASSROOM_EVENTS_LOAD:
      return { ...state, selectedClassroomEvents: action.payload };
    case CLASSROOM_EVENTS_ADD:
      return {
        ...state,
        selectedClassroomEvents: [
          ...(state.selectedClassroomEvents as ClassroomEvent[]),
          action.payload,
        ],
      };
    case CLASSROOM_LOAD_BANNED:
      return { ...state, selectedClassroomBannedStudents: action.payload };
    case CLASSROOM_BAN_STUDENT:
      return { ...state, selectedClassroomBannedStudents: action.payload };
    case CLASSROOM_UNBAN_STUDENT:
      return { ...state, selectedClassroomBannedStudents: action.payload };

    default:
      return state;
  }
};
