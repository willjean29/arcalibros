import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import imgAdd from "../../assets/icons/add.png";
import Modal from "../modal/Modal";
import ModalAddBook from "../modal/ModalAddBook";

const NavbarBooks = () => {
  const [openModalAddBook, setOpenModalAddBook] = useState(false);

  return (
    <div className="navbar-book">
      <Modal modalOpen={openModalAddBook}>
        <ModalAddBook setModalOpen={setOpenModalAddBook} />
      </Modal>
      {/* <div className="btn-back" onClick={HandleBack}>
        <img src={imgBack} alt="" />
      </div> */}
      <div className="btn-add-book" onClick={() => setOpenModalAddBook(true)}>
        <img src={imgAdd} alt="" />
        Agregar libro
      </div>
    </div>
  );
};

export default NavbarBooks;
