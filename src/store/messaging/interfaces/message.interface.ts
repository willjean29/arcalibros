export interface Message {
  _id?: string;
  sender: string;
  subject: string;
  receptor: string;
  read: boolean;
  messageText: string;
  file?: string;
  date: string;
}
