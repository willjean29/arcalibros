import { Classroom } from "../../classroom/interfaces/classroom.interface";
import { TopicComment } from "./topic-comment.interface";

export interface Topic {
  _id?: string;
  classroom: Classroom;
  comments: TopicComment[];
  topic: string;
  description: string;
}
