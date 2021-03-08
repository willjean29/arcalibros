import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import img from "../../assets/images/resources.png";
import imgClose from "../../assets/images/btn-close.png";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  change: Dispatch<SetStateAction<string>>;
};

const ModalVideoconferenceURL: React.FC<Props> = ({ setModalOpen, change }) => {
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)}/>

      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Agregar enlace de video conferencia</h3>
        <h6 className="modal-description">A continuación ingrese un enlace</h6>
        <form>
          <input
            type="text"
            placeholder="Enlace de meet o zoom"
            onChange={(e) => change(e.target.value)}
          />
          <button
            className="btn-modal"
            type="button"
            onClick={() => setModalOpen(false)}
          >
            Establecer
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalVideoconferenceURL;
