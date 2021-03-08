import { IState } from "./interfaces/messaging-state.interface";
import {
  MESSAGES_LOAD_HOMEWORK,
  MESSAGES_LOAD_RECEIVED,
  MESSAGES_LOAD_SENDED,
  MESSAGE_LOAD,
  MESSAGE_NEW,
  MESSAGE_RECEIVE_NEW,
  MESSAGE_SEND_ERROR,
  MESSAGE_UNLOAD,
  MessagingDispatchTypes,
} from "./messaging.types";

export {};

const defaultState: IState = {
  receivedMessages: [],
  homeworkMessages: [],
  sendedMessages: [],
};

export const messagingReducer = (
  state: IState = defaultState,
  action: MessagingDispatchTypes
): IState => {
  switch (action.type) {
    case MESSAGE_NEW:
      return { ...state, messageErrors: action.payload };
    case MESSAGES_LOAD_RECEIVED:
      return { ...state, receivedMessages: action.payload };
    case MESSAGES_LOAD_SENDED:
      return { ...state, sendedMessages: action.payload };
    case MESSAGES_LOAD_HOMEWORK:
      return { ...state, homeworkMessages: action.payload };
    case MESSAGE_LOAD:
      return { ...state, individualMessage: action.payload };
    case MESSAGE_UNLOAD:
      return { ...state, individualMessage: undefined };
    case MESSAGE_RECEIVE_NEW:
      return {
        ...state,
        receivedMessages: [...state.receivedMessages, action.payload],
      };
    case MESSAGE_SEND_ERROR:
      return { ...state, messageErrors: action.payload };
    default:
      return state;
  }
};
