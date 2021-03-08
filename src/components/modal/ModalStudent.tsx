import React, { Dispatch, SetStateAction } from "react";
import img from "../../assets/images/resources.png";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalStudent: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <>
      <div className="modverlay" />

      <div className="card-modal-general">
        <h3 className="welcometo">Bienvenido a Arca de Papel </h3>
        <h6 className="modal-description">
          Para continuar porfavor complete su perfil
        </h6>
        <form>
          <input type="text" placeholder="Nombre del colegio" />
          <input type="text" placeholder="Distrito del colegio" />
          <img src={img} alt="" />
          <button className="btn-modal">Continuar</button>
        </form>
      </div>
    </>
  );
};

export default ModalStudent;
