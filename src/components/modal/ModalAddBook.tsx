import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgLogo from "../../assets/images/logo.png";
import imgClose from "../../assets/images/btn-close.png";
import { RootStore } from "../../store/store";
import { addBookToLibrary } from "../../store/library/library.actions";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalAddBook: React.FC<Props> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const [bookCode, setBookCode] = useState("");
  const handleAddBook = (e: any) => {
    e.preventDefault();
    dispatch(addBookToLibrary(userId, bookCode));
    setModalOpen(false);
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <img width="200px" src={imgLogo} alt="" />
        <h3 className="welcometo">Agregue libros a su libreria personal</h3>
        <p>Inserte el código que se encuentra en su libro impreso.</p>
        <form onSubmit={handleAddBook}>
          <input
            className="show-code"
            type="text"
            onChange={(e) => setBookCode(e.target.value)}
          />
          <button className="btn-modal" type="submit">
            Agregar libro
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalAddBook;