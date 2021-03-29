import { BookCode } from "./interfaces/book-code.interface";
import { Book } from "./interfaces/book.interface";

export const libraryURL = "http://localhost:4000/books/";

export const LIBRARY_LOAD = "LIBRARY_LOAD";
export const LIBRARY_ADD_BOOK = "LIBRARY_ADD_BOOK";

export interface LoadLibrary {
  type: typeof LIBRARY_LOAD;
  payload: BookCode[];
}

export interface AddBookLibrary {
  type: typeof LIBRARY_ADD_BOOK;
  payload: BookCode[];
}

export type LibraryDispatchTypes = LoadLibrary | AddBookLibrary;
