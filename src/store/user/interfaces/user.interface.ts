import { Classroom } from "../../classroom/interfaces/classroom.interface";
import { School } from "./school.interface";


export interface User{
    _id?:string;
    firstName:string;
    lastName:string;
    email:string;
    type:number;
    password:string;
    classrooms:Classroom[];
     //teacher
    school:School;
    dni?:string;
    levels?:string[];
    registerCode?:string;
     //student   
    parentEmail?:string;
    bookCode?:string;
    birthday?: string;
    schoolName?:string;
}