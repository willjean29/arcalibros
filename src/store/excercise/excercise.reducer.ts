import { ExcerciseDispatchTypes, EXCERCISE_CREATE, EXCERCISE_FLAG, EXCERCISE_LOAD } from "./excercise.types";
import { IState } from "./interfaces/excercise-state.interface";
import { Excercise } from "./interfaces/exercise.interface";

const defaultState :IState= {
    excercises:[] as Excercise[],
    excerciseFlag:false
}

export const excerciseReducer = (state:IState=defaultState,action:ExcerciseDispatchTypes)=>{
    switch(action.type){
        case EXCERCISE_LOAD:
            return {...state,excercises:action.payload}
        case EXCERCISE_CREATE:
            return {...state,excercises:[...state.excercises,action.payload]}
        case EXCERCISE_FLAG:
            return {...state,excerciseFlag:action.payload}
        default:
            return state;
    }
}