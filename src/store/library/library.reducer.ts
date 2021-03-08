import { BookCode } from "./interfaces/book-code.interface";
import { Book } from "./interfaces/book.interface";
import { IState } from "./interfaces/library-state.interface";
import {
  LibraryDispatchTypes,
  LIBRARY_ADD_BOOK,
  LIBRARY_LOAD,
} from "./library.types";

const defaultState: IState = {
  books: [] as BookCode[],
};

export const libraryReducer = (
  state: IState = defaultState,
  action: LibraryDispatchTypes
): IState => {
  switch (action.type) {
    case LIBRARY_LOAD:
      return { ...state, books: action.payload };
    case LIBRARY_ADD_BOOK:
      return { ...state, books: action.payload };
    default:
      return state;
  }
};
