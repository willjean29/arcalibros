import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";

import { RootStore } from "../store";
import {
  LibraryDispatchTypes,
  libraryURL,
  LIBRARY_LOAD,
} from "./library.types";
import { toast } from "react-toastify";

export const loadLibrary = (userId: string) => async (
  dispatch: Dispatch<LibraryDispatchTypes>
) => {
  try {
    const res = await axios.get(libraryURL.concat(`library/${userId}`));
    if (res.data.books) {
      dispatch({
        type: LIBRARY_LOAD,
        payload: res.data.books,
      });
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const addBookToLibrary = (user: string, code: string) => async (
  dispatch: Dispatch<LibraryDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    const res = await axios.post(libraryURL.concat(`library/add`), {
      user,
      code,
    });
    if (res.data.book) {
      const oldBooks = getState().library.books;
      const newBooks = [...oldBooks, res.data.book];
      dispatch({
        type: LIBRARY_LOAD,
        payload: newBooks,
      });
      toast.success("Libro agregado con éxito");
    }
  } catch (error) {
    const errorAxios: AxiosError = error;
    toast.error(errorAxios.response?.data.message);
  }
};
