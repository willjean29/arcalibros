import React, { Dispatch, FormEvent, SetStateAction } from "react";
import ItemPreviewHomework from "../homework/ItemPreviewHomework";
import imgClose from "../../assets/images/btn-close.png";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalAddHomework: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general add-question-modal">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Agregar Tarea</h3>
        <form>
          <div className="show-question">
            <ItemPreviewHomework />
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalAddHomework;
