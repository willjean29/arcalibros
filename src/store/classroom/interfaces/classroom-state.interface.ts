import { BannedStudent } from "./banned-student.interface";
import { ClassroomComment } from "./classroom-comment.interface";
import { ClassroomEvent } from "./classroom-events.interface";
import { Classroom } from "./classroom.interface";

export interface IState {
  selectedClassroom?: Classroom;
  selectedClassroomComments?: ClassroomComment[];
  selectedClassroomEvents?: ClassroomEvent[];
  selectedClassroomBannedStudents?: BannedStudent[];
  classrooms: Classroom[];
  createClassroomError?: string[];
  closeClassroomModal: boolean;
}
