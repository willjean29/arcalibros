import React, { Dispatch, SetStateAction } from "react";
import imgClose from "../../assets/images/btn-close.png";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalDeleteClassroom: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Eliminar Salón</h3>
        <p>¿Estás seguro que deseas eliminar este salón?</p>
        <form>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Borrar
            </button>
            <button
              className="btn-modal btn-cancel"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalDeleteClassroom;
