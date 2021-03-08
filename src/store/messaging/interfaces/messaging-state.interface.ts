import { Message } from "./message.interface";

export interface IState {
  receivedMessages: Message[];
  sendedMessages: Message[];
  homeworkMessages: Message[];
  individualMessage?: Message;
  messageErrors?: string[];
}
