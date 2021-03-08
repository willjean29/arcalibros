import { AlternativeDto } from "./alternative.dto";

export interface ExcerciseDto{
    type:number;
    statement:string;
    alternatives?:AlternativeDto[];
    selectionAnswer?:string;
    fillAnswer?:string;
    dragGroups?:string[];
    teacher:string;
    course:string;
}