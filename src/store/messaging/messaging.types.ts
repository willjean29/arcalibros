import { Message } from "./interfaces/message.interface";

export const MESSAGE_NEW = "MESSAGE_NEW";
export const MESSAGES_LOAD_RECEIVED = "MESSAGES_LOAD_RECEIVED";
export const MESSAGES_LOAD_SENDED = "MESSAGES_LOAD_SENDED";
export const MESSAGES_LOAD_HOMEWORK = "MESSAGES_LOAD_HOMEWORK";
export const MESSAGE_LOAD = "MESSAGE_LOAD";
export const MESSAGE_UNLOAD = "MESSAGE_UNLOAD";
export const MESSAGE_SET_READ = "MESSAGE_SET_READ";
export const MESSAGE_RECEIVE_NEW = "MESSAGE_RECEIVE_NEW";
export const MESSAGE_SEND_ERROR = "MESSAGE_SEND_ERROR";
export const messagingURL = "http://localhost:4000/messaging/";

export interface NewMessage {
  type: typeof MESSAGE_NEW;
  payload: undefined;
}

export interface LoadReceivedMessages {
  type: typeof MESSAGES_LOAD_RECEIVED;
  payload: Message[];
}

export interface LoadSendedMessages {
  type: typeof MESSAGES_LOAD_SENDED;
  payload: Message[];
}

export interface LoadHomeworkMessages {
  type: typeof MESSAGES_LOAD_HOMEWORK;
  payload: Message[];
}

export interface LoadMessage {
  type: typeof MESSAGE_LOAD;
  payload: Message;
}

export interface UnloadMessage {
  type: typeof MESSAGE_UNLOAD;
  payload: undefined;
}

export interface MessageSetRead {
  type: typeof MESSAGE_SET_READ;
}

export interface MessageReceiveNew {
  type: typeof MESSAGE_RECEIVE_NEW;
  payload: Message;
}

export interface MessageSendError {
  type: typeof MESSAGE_SEND_ERROR;
  payload: string[];
}

export type MessagingDispatchTypes =
  | NewMessage
  | LoadReceivedMessages
  | LoadSendedMessages
  | LoadHomeworkMessages
  | LoadMessage
  | MessageSetRead
  | UnloadMessage
  | MessageReceiveNew
  | MessageSendError;
