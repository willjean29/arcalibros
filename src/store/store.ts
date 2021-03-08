import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./root-reducer";

import thunk from "redux-thunk";

function saveToLocalStorage(state:any){
    try {
        const serializeState = JSON.stringify(state);
        localStorage.setItem('state',serializeState);
    } catch (error) {
        console.log(error);
    }
}

function loadFromLocalStorage(){
    try {
        const serializeState = localStorage.getItem('state');
        if(serializeState===null) return undefined;
        return JSON.parse(serializeState);
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();
export const store = createStore(rootReducer,persistedState,composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(()=>saveToLocalStorage(store.getState()));

export type RootStore = ReturnType<typeof rootReducer>