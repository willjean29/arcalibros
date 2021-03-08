import { Alternative } from "./alternative.interface";

export interface Excercise {
  _id: string;
  alternatives: Alternative[];
  dragGroups?: string[];
  type: number;
  statement: string;
  course: string;
  selectionAnswer?: string;
  fillAnswer?: string;
  teacher: string;
  photo?: string;
}
