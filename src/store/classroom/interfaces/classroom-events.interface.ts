import { Classroom } from "./classroom.interface";

export interface ClassroomEvent {
  _id?: string;
  start: string;
  title: string;
  classroom?: string | Classroom;
}
