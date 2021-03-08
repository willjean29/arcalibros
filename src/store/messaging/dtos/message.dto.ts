export interface MessageDto {
  sender: string;
  subject: string;
  receptor: string;
  read: boolean;
  messageText: string;
  // messgeMultimedia:Object;
  date: string;
}
