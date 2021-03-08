import { Book } from "./book.interface";

export interface BookCode {
  _id?: string;
  book: string | Book;
  code: string;
  user?: string;
}
